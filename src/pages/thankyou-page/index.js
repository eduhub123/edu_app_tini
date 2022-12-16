import queryString from "query-string";
import { reLaunch } from "../../utils/navigate";
import { getDetailOrder } from "../../services/index";

Page({
  data: {
    status: "processing",
    orderId: "",
    paymentMethod: "Thanh toán với Tiki",
    totalMoney: 0,
    totalPayment: 0,
    fee: 0,
    message: "",
    time: 0,
    products: {},
    orderMonkeyId: "",
  },

  onLoad(query) {
    const { status, orderId, totalPayment, message, orderMonkeyId } =
      queryString.parse(query);

    if (status !== "error") {
      my.hideBackHome({ hide: true });
    }

    this.setData({
      status,
      orderId,
      totalPayment,
      message,
      orderMonkeyId,
    });
  },

  goToOrderDetail() {
    reLaunch({
      page: "order-detail",
      params: {
        status: this.data.status === "success" ? "Thành công" : "Đang xử lý",
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

  async onCheckOrder() {
    try {
      const resDetail = await getDetailOrder(this.data.orderMonkeyId);
      if (resDetail.status === "success") {
        if (resDetail.data.status === "online_paid") {
          this.setData({
            status: "success",
            totalMoney: resDetail.data.total_money,
            totalPayment: resDetail.data.total_payment,
            fee: resDetail.data.fee,
            time: resDetail.data.created_time,
            products: JSON.stringify(resDetail.data.product),
          });
        }
        if (resDetail.data.status === "canceled") {
          this.setData({
            status: "cancel",
            totalMoney: resDetail.data.total_money,
            totalPayment: resDetail.data.total_payment,
          });
        }
      }
    } catch {}
  },

  onReady() {
    this.onCheckOrder();
    const checkOrder = setInterval(() => {
      if (this.data.status === "processing") {
        this.onCheckOrder();
      } else {
        clearInterval(checkOrder);
      }
    }, 10000);
  },
});
