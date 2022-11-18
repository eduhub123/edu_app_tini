import { navigateWithParams } from "../../utils/navigate";
import { checkName, checkPhone, checkEmail } from "../../utils/validate";

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
    errors: {},
  },

  onPayment() {
    if (this.data.order.totalQuantityChoose <= 0) {
      return this.setData({
        errors: {
          ...this.data.errors,
          listProduct: "Vui lòng chọn ít nhất một sản phẩm",
        },
      });
    }

    const errorName = checkName(this.data.userInfo.fullName);
    const errorPhone = checkPhone(this.data.userInfo.phone);
    const errorEmail = checkEmail(this.data.userInfo.email);
    if (
      errorName !== "pass" ||
      errorPhone !== "pass" ||
      errorEmail !== "pass"
    ) {
      return this.setData({
        errors: {
          ...this.data.errors,
          userInfo: "Thông tin liên hệ chưa đầy đủ hoặc sai định dạng",
        },
      });
    }

    navigateWithParams({
      page: "thankyou-page",
      params: {
        status: "success",
        orderId: "ABC1511",
        paymentMethod: "Thẻ Visa",
        totalPayment: 16000000,
        message: "",
      },
    });

    app.clearCart();

    this.setData({
      errors: {},
    });
  },

  onChangeCustomerInfo({ fullName, phone, email }) {
    this.setData({
      userInfo: { fullName, phone, email },
      errors: { userInfo: "" },
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

  onLoad() {
    this.loadData();
  },
});
