import { navigateWithParams } from "../../utils/navigate";

const app = getApp();

Page({
  data: {
    order: {
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
    userInfo: {
      fullName: "",
      phone: "",
      email: "",
    },
  },

  onPayment() {
    navigateWithParams({
      page: "thankyou-page",
    });
  },

  onChangeCustomerInfo({ fullName, phone, email }) {
    this.setData({
      userInfo: { fullName, phone, email },
    });
  },

  async loadData() {
    const orderedProducts = app.cart.orderedProducts.filter(
      (item) => item.choose
    );
    const userInfo = app.userInfo;
    this.setData({
      order: { ...app.cart, orderedProducts },
      userInfo,
    });
  },

  onShow() {
    this.loadData();
  },
});
