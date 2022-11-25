const app = getApp();

Component({
  props: {
    titleButton: "",
    totalQuantity: 0,
    totalMoney: 0,
    disabled: false,
    isLoading: false,
    coupon: { name: "", discount: 0, isValid: false },
    onTapBuyNow: () => {},
  },

  data: {
    showPopupDiscount: false,
    listCoupons: [],
  },

  didMount() {
    this.setCoupon();
  },

  methods: {
    onTogglePopupDiscount() {
      this.setData({
        showPopupDiscount: !this.data.showPopupDiscount,
      });
    },

    _onTapBuyNow() {
      this.props.onTapBuyNow();
    },

    setCoupon() {
      const coupon = app.cart.coupon;
      this.setData({ _coupon: coupon });
    },
  },
});
