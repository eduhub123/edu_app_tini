import { navigateWithParams } from "../../utils/navigate";
import { EMITTERS } from "../../constants/app";

const app = getApp();

Page({
  disposableCollection: [],

  data: {
    cart: {
      orderedProducts: [],
      shippingFee: 0,
      totalMoney: 0,
      totalPayment: 0,
      totalQuantity: 0,
      totalQuantityChoose: 0,
      coupon: {
        name: "",
        discount: 0,
        isValid: false,
      },
    },
    modal: {
      key: "",
      isShow: false,
      headers: [],
      descriptions: [],
      leftButton: "",
      rightButton: "",
    },
    selectedIndex: "",
    isChooseAllProduct: false,
  },

  onChangeQuantity(index, quantity) {
    app.changeQuantityProduct(index, quantity);
  },

  onChooseProduct(index, value) {
    app.chooseProduct(index, value);
  },

  onChooseAllProduct() {
    app.chooseAllProduct(!this.data.isChooseAllProduct);
  },

  onRemoveProduct() {
    app.removeProduct(this.data.selectedIndex);
    this.onHidePopupConfirmRemove();
  },

  confirmRemoveOrder(index) {
    this.setData({
      selectedIndex: index,
    });
    this.setData({
      modal: {
        isShow: true,
        headers: ["Xác nhận"],
        descriptions: ["Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?"],
        leftButton: "Xóa",
        rightButton: "Hủy",
      },
    });
  },

  onHidePopupConfirmRemove() {
    this.setData({
      selectedIndex: "",
      modal: {
        key: "",
        isShow: false,
        headers: [],
        descriptions: [],
        leftButton: "",
        rightButton: "",
      },
    });
  },

  onTapBuyNow() {
    if (app.userInfo.tikiId) {
      navigateWithParams({
        page: "order-confirm",
      });
    } else {
      app.loadUserInfo();
    }
  },

  async loadData() {
    const isNotChooseAll = app.cart.orderedProducts.some(
      (item) => !item.choose
    );
    this.setData({
      cart: app.cart,
      isChooseAllProduct: !isNotChooseAll,
    });
  },

  async onLoad() {
    this.disposableCollection.push(
      app.cartEvent.on(EMITTERS.CART_UPDATE, (cart) => {
        const isNotChooseAll = cart.orderedProducts.some(
          (item) => !item.choose
        );
        this.setData({
          cart,
          isChooseAllProduct: !isNotChooseAll,
        });
      })
    );
  },

  onShow() {
    this.loadData();
  },
});
