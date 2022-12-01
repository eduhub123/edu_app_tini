const app = getApp();

Component({
  props: {
    showPopupDiscount: false,
    totalMoney: 0,
    onTogglePopupDiscount: () => {},
    onSubmitCoupon: () => {},
    listChooseProduct: [],
  },

  data: {
    isEmpty: false,
  },

  deriveDataFromProps() {
    let isEmpty = true;
    this.props.listChooseProduct.forEach((item) => {
      if (item.listCoupon?.length > 0) {
        isEmpty = false;
      }
    });
    this.setData({
      isEmpty: isEmpty,
    });
  },

  methods: {
    _onTogglePopupDiscount() {
      this.props.onTogglePopupDiscount();
      this.setData({
        _coupon: this.props.coupon,
      });
    },
  },
});
