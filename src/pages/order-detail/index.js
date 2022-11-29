import queryString from "query-string";
import { redirectTo } from "../../utils/navigate";

Page({
  data: {
    status: "Thành công",
    orderId: "",
    paymentMethod: "Thanh toán với Tiki",
    totalMoney: 0,
    totalPayment: 0,
    fee: 0,
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

    const produtsParse = JSON.parse(products);
    const listProduct = Object.values(produtsParse).map((product) => ({
      appId: product.app_id,
      image: product.image,
      nameProduct: product.product_name,
      quantity: product.quantity,
    }));

    this.setData({
      status,
      orderId,
      paymentMethod,
      totalPayment,
      message,
      totalMoney,
      fee,
      time,
      products: listProduct,
    });
  },

  tapGoToHome() {
    redirectTo({
      page: "home",
    });
  },
});
