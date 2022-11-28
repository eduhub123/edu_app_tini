import queryString from "query-string";
import { reLaunch } from "../../utils/navigate";

Page({
  data: {
    status: "success",
    orderId: "",
    paymentMethod: "Thanh toán với Tiki",
    totalMoney: 0,
    totalPayment: 0,
    fee: 0,
    message: "",
    time: 0,
    products: {},
  },

  onLoad(query) {
    const {
      status,
      orderId,
      paymentMethod,
      totalPayment,
      message,
      totalMoney,
      fee,
      time,
      products,
    } = queryString.parse(query);

    if (status === "success") {
      my.hideBackHome({ hide: true });
    }

    this.setData({
      status,
      orderId,
      paymentMethod,
      totalPayment,
      message,
      totalMoney,
      fee,
      time,
      products,
    });
  },

  goToOrderDetail() {
    reLaunch({
      page: "order-detail",
      params: {
        status: "Thành công",
        orderId: this.data.orderId,
        paymentMethod: "Thanh toán với Tiki",
        totalMoney: this.data.totalMoney,
        totalPayment: this.data.totalPayment,
        fee: this.data.fee,
        time: this.data.time,
        products: this.data.products,
      },
    });
  },

  goToHome() {
    reLaunch({
      page: "home",
    });
  },

  goToBack() {
    my.navigateBack();
  },
});
