import { EMITTERS } from "./constants/app";
import EventEmitter from "./utils/event";

App({
  cartEvent: new EventEmitter(),

  cart: {
    buyer: {},
    seller: {},
    orderedProducts: [],
    productId: "",
    shippingFee: 0,
    price: 0,
    total: 0,
    coupon: {
      name: "",
      discount: 0,
      isValid: false,
    },
  },

  async loadCart() {
    try {
      // const cart = await getCartAPI();
      const cart = {};
      this.cart = { ...this.cart, ...cart };
    } catch {}
  },

  setProductId(productId) {
    this.productId = productId;
  },

  addProduct(product) {
    const position = this.cart.orderedProducts.findIndex(
      (item) => item.id === product.id
    );
    if (position !== -1) this.cart.orderedProducts[position].quantity += 1;
    else this.cart.orderedProducts.push({ ...product, quantity: 1 });

    this.calculatePrices();
  },

  removeProduct(index) {
    this.cart.orderedProducts.splice(index, 1);

    this.calculatePrices();
  },

  calculatePrices() {
    const { shippingFee, coupon, orderedProducts } = this.cart;
    const price = orderedProducts.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    const total = price > 0 ? price + shippingFee - coupon.discount : 0;
    this.cart = {
      ...this.cart,
      price,
      total,
    };

    this.cartEvent.emit(EMITTERS.CART_UPDATE, this.cart);
  },

  changeQuantityProduct(index, quantity) {
    this.cart.orderedProducts[index].quantity = quantity;

    this.calculatePrices();
  },

  async selectCoupon(code) {
    try {
      const coupon = await getCouponFromCodeAPI(code);
      this.cart.coupon = coupon;

      this.calculatePrices();
    } catch {}
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
      price: 0,
      total: 0,
      coupon: {
        name: "",
        discount: 0,
        isValid: false,
      },
    };

    this.calculatePrices();
  },

  // Life cycle
  onShow() {
    this.loadCart();
  },
});
