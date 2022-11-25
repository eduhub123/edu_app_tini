import queryString from "query-string";
import { reLaunch } from "../../utils/navigate";

Page({
  data: {
    status: "success",
    orderId: "",
    paymentMethod: "",
    totalPayment: "",
    message: "",
  },

  onLoad(query) {
    const { status, orderId, paymentMethod, totalPayment, message } =
      queryString.parse(query);

    if (status === "success") {
      my.hideBackHome({ hide: true });
    }

    this.setData({ status, orderId, paymentMethod, totalPayment, message });
  },

  goToOrderDetail() {
    reLaunch({
      page: "order-detail",
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
