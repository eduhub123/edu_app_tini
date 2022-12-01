import { navigateWithParams } from "../../utils/navigate";
import { checkName, checkPhone, checkEmail } from "../../utils/validate";
import { EMITTERS } from "../../constants/app";
import { postCreateOrder, getDetailOrder } from "../../services/index";

const app = getApp();

Page({
  disposableCollection: [],

  data: {
    order: {
      orderedProducts: [],
      shippingFee: 0,
      totalMoney: 0,
      totalPayment: 0,
      totalQuantity: 0,
      totalQuantityChoose: 0,
      totalDiscount: 0,
    },
    userInfo: {
      fullName: "",
      phone: "",
      email: "",
    },
    errors: {},
    isLoading: false,
    isCheckPayment: false,
    toast: {
      show: false,
      message: "",
    },
  },

  onLoad() {
    this.disposableCollection.push(
      app.cartEvent.on(EMITTERS.CART_UPDATE, (cart) => {
        const orderedProducts = cart.orderedProducts.filter(
          (item) => item.choose
        );
        this.setData({
          order: { ...cart, orderedProducts },
        });
      })
    );
  },

  onShow() {
    this.loadData();
  },

  onTapPayment() {
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
      this.onShowToast("Thông tin liên hệ chưa đầy đủ hoặc sai định dạng");
      return this.setData({
        errors: {
          ...this.data.errors,
          userInfo: "Thông tin liên hệ chưa đầy đủ hoặc sai định dạng",
        },
      });
    }
    this.createOrder();
  },

  async createOrder() {
    this.setData({ isLoading: true });
    try {
      const listProduct = this.data.order.orderedProducts.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        app_id: product.appId,
        promotion_id: product.promotion?.promotion_id ?? "",
        group_voucher_id:
          product.coupon?.group_voucher_id && !product.coupon?.isNotValid
            ? product.coupon?.group_voucher_id
            : "",
      }));

      const payload = {
        ...this.data.userInfo,
        listProduct,
      };

      const res = await postCreateOrder(payload);

      if (res.status === "success") {
        this.onPaymentTiki(
          res.data.id_order_tiki,
          res.data.order_id,
          res.data.total_price
        );
      } else {
        this.setData({
          isLoading: false,
        });
        this.onShowToast("Lỗi: " + res.message);
        app.loadCoupon();
      }
    } catch {
      this.setData({
        isLoading: false,
      });
      this.onShowToast(
        "Tạo đơn hàng thất bại. Vui lòng liên hệ 1900636052 để được hỗ trợ"
      );
    }
  },

  onPaymentTiki(orderTikiId, orderMonkeyId, totalPayment) {
    my.makePayment({
      orderId: orderTikiId,
      success: async () => {
        try {
          this.setData({
            isCheckPayment: true,
          });
          my.hideBackHome({ hide: true });
          const resDetail = await getDetailOrder(orderMonkeyId);
          if (resDetail.status === "success") {
            if (resDetail.data.status === "online_paid") {
              navigateWithParams({
                page: "thankyou-page",
                params: {
                  status: "success",
                  orderId: resDetail.data.tiki_order_id,
                  paymentMethod: "Thanh toán với Tiki",
                  totalMoney: resDetail.data.total_money,
                  totalPayment: resDetail.data.total_payment,
                  fee: resDetail.data.fee,
                  message: "",
                  time: resDetail.data.created_time,
                  products: JSON.stringify(resDetail.data.product),
                },
              });
            } else {
              navigateWithParams({
                page: "thankyou-page",
                params: {
                  status: "error",
                  orderId: orderTikiId,
                  paymentMethod: "Thanh toán với Tiki",
                  totalPayment: totalPayment,
                  message: "",
                },
              });
            }
          }
        } catch {
        } finally {
          this.setData({
            isCheckPayment: false,
          });
          my.hideBackHome({ hide: false });
        }
        app.clearCart();
      },
      fail: (res) => {
        navigateWithParams({
          page: "thankyou-page",
          params: {
            status: "error",
            orderId: orderTikiId,
            paymentMethod: "Thanh toán với Tiki",
            totalPayment: totalPayment,
            message: res.errorMessage ?? "",
          },
        });
      },
      complete: (res) => {
        this.setData({
          errors: {},
          isLoading: false,
        });
      },
    });
  },

  onChangeCustomerInfo({ fullName, phone, email }) {
    this.setData({
      userInfo: { ...this.data.userInfo, fullName, phone, email },
      errors: { userInfo: "" },
    });
  },

  loadData() {
    const orderedProducts = app.cart.orderedProducts.filter(
      (item) => item.choose
    );
    const userInfo = app.userInfo;
    this.setData({
      order: { ...app.cart, orderedProducts },
      userInfo,
    });
  },

  onShowToast(message) {
    this.setData({
      toast: {
        show: true,
        message: message,
      },
    });
  },

  onCloseToast() {
    this.setData({
      toast: {
        show: false,
        message: "",
      },
    });
  },
});
