import { EMITTERS } from "./constants/app";
import EventEmitter from "./utils/event";
import { setNavigationBar } from "./utils/common";
import { getCouponTiki } from "./services";

App({
  cartEvent: new EventEmitter(),

  cart: {
    orderedProducts: [],
    shippingFee: 0,
    totalMoney: 0,
    totalPayment: 0,
    totalQuantity: 0,
    totalQuantityChoose: 0,
    totalDiscount: 0,
  },

  userInfo: {
    customerId: "",
    fullName: "",
    phone: "",
    email: "",
  },

  listCoupon: {},

  async loadCoupon() {
    try {
      const resCoupon = await getCouponTiki();
      if (resCoupon.status === "success") {
        this.listCoupon = resCoupon.data;
      } else {
        throw "";
      }
    } catch {
      this.listCoupon = {};
    }

    this.cart.orderedProducts = this.cart.orderedProducts.map((product) => {
      const isCouponValid = Boolean(
        this.listCoupon[product.id]?.[product.coupon?.group_voucher_id]
      );

      return {
        ...product,
        listCoupon: Object.values(this.listCoupon[product.id] ?? {}),
        coupon: product.coupon?.group_voucher_id
          ? { ...product.coupon, isNotValid: !isCouponValid }
          : {},
      };
    });
    this.calculatePrices();
  },

  loadCart() {
    my.getStorage({
      key: "cart",
      success: (res) => {
        const cart = res.data;
        this.cart = { ...this.cart, orderedProducts: cart ?? [] };
        this.calculatePrices();
      },
    });
  },

  loadUserInfo() {
    my.getUserInfo({
      success: (res) => {
        const phone = res.phone?.replace("+84", "0");
        this.editUserInfo({
          customerId: res.customerId,
          fullName: res.name,
          phone: phone,
          email: res.email,
        });
      },
      complete: (res) => {
        my.getStorage({
          key: "customerId",
          success: (_res) => {
            if (_res.data && _res.data !== res.customerId) {
              this.resetCart();
            }
          },
        });
        my.setStorage({
          key: "customerId",
          data: res.customerId,
        });
      },
    });
  },

  editUserInfo({ customerId, fullName, phone, email }) {
    this.userInfo = { customerId, fullName, phone, email };
  },

  addProduct(product) {
    const position = this.cart.orderedProducts.findIndex(
      (item) => item.id === product.id
    );

    const listCoupon = this.listCoupon[product.id];

    if (position !== -1) {
      this.cart.orderedProducts[position].quantity += 1;
      this.cart.orderedProducts[position].choose = true;
    } else {
      this.cart.orderedProducts.push({
        ...product,
        quantity: 1,
        choose: true,
        listCoupon: Object.values(listCoupon ?? {}),
      });
    }

    this.calculatePrices();
  },

  removeProduct(index) {
    this.cart.orderedProducts.splice(index, 1);

    this.calculatePrices();
  },

  calculatePrices() {
    const { shippingFee, coupon, orderedProducts } = this.cart;
    const totalMoney = orderedProducts.reduce((acc, curr) => {
      return curr.choose ? acc + curr.price * curr.quantity : acc;
    }, 0);
    const totalQuantityChoose = orderedProducts.reduce((acc, curr) => {
      return curr.choose ? acc + curr.quantity : acc;
    }, 0);
    const totalQuantity = orderedProducts.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    const totalDiscount = orderedProducts.reduce((acc, curr) => {
      const discountMoney =
        curr?.coupon?.price && !curr?.coupon?.isNotValid
          ? (curr.price - curr.coupon.price) * curr.quantity
          : 0;
      return curr.choose ? acc + discountMoney : acc;
    }, 0);
    const totalPayment =
      totalMoney > 0 ? totalMoney + shippingFee - totalDiscount : 0;
    this.cart = {
      ...this.cart,
      totalMoney,
      totalQuantityChoose,
      totalPayment,
      totalQuantity,
      totalDiscount,
    };

    my.setStorage({
      key: "cart",
      data: this.cart.orderedProducts,
    });

    this.cartEvent.emit(EMITTERS.CART_UPDATE, this.cart);
  },

  changeQuantityProduct(index, quantity) {
    this.cart.orderedProducts[index].quantity = quantity;

    this.calculatePrices();
  },

  chooseProduct(index, value) {
    this.cart.orderedProducts[index].choose = value;

    this.calculatePrices();
  },

  chooseAllProduct(value) {
    const newData = this.cart.orderedProducts.map((item) => ({
      ...item,
      choose: value,
    }));
    this.cart.orderedProducts = newData;

    this.calculatePrices();
  },

  selectCoupon(product, coupon) {
    const position = this.cart.orderedProducts.findIndex(
      (item) => item.id === product.id
    );
    if (position !== -1) {
      if (
        this.cart.orderedProducts[position].coupon?.group_voucher_id !==
        coupon.group_voucher_id
      ) {
        this.cart.orderedProducts[position].coupon = coupon;
      } else {
        this.cart.orderedProducts[position].coupon = {};
      }
    }

    this.calculatePrices();
  },

  removeCoupon() {
    this.cart.coupon = {
      name: "",
      discount: 0,
      isValid: false,
    };

    this.calculatePrices();
  },

  resetCart() {
    this.cart = {
      ...this.cart,
      orderedProducts: [],
      shippingFee: 0,
      totalMoney: 0,
      totalPayment: 0,
      totalQuantity: 0,
      totalQuantityChoose: 0,
      totalDiscount: 0,
    };

    this.calculatePrices();
    setNavigationBar();
  },

  clearCart() {
    const newData = this.cart.orderedProducts.filter((item) => !item.choose);
    this.cart.orderedProducts = newData;

    this.calculatePrices();
  },

  // Life cycle
  onShow() {
    this.loadCart();
    this.loadUserInfo();
    this.loadCoupon();
  },
});
