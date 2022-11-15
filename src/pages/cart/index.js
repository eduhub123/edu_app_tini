import { navigateWithParams } from "../../utils/navigate";
import { EMITTERS } from "../../constants/app";

const app = getApp();

Page({
  disposableCollection: [],

  data: {
    cart: {
      buyer: {},
      seller: {},
      orderedProducts: [],
      shippingFee: 0,
      price: 0,
      total: 0,
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
  },

  onChangeQuantity(index, quantity) {
    app.changeQuantityProduct(index, quantity);
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
    navigateWithParams({
      page: "order-confirm",
    });
  },

  async loadData() {
    this.setData({
      cart: app.cart,
    });
  },

  async onLoad() {
    this.disposableCollection.push(
      app.cartEvent.on(EMITTERS.CART_UPDATE, (cart) => {
        this.setData({
          cart,
        });
      })
    );
  },

  onShow() {
    this.loadData();
  },
});
