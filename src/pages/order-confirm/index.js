import { navigateWithParams } from "../../utils/navigate";

const app = getApp();

Page({
  data: {
    order: {
      buyer: {},
      seller: {},
      orderedProducts: [],
      shippingFee: 0,
      price: 0,
      total: 0,
      totalQuantity: 0,
      coupon: {
        name: "",
        discount: 0,
        isValid: false,
      },
    },
  },

  onPayment() {
    navigateWithParams({
      page: "thankyou-page",
    });
  },

  async loadData() {
    const orderedProducts = app.cart.orderedProducts.filter(
      (item) => item.choose
    );
    this.setData({
      order: { ...app.cart, orderedProducts },
    });
  },

  onShow() {
    this.loadData();
  },
});
