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
    listChooseProduct: [],
    hideCoupon: false,
  },

  data: {
    showPopupDiscount: false,
    listCoupons: [],
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
  },
});
