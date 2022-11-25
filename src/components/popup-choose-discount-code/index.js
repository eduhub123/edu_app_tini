const app = getApp();

Component({
  props: {
    showPopupDiscount: false,
    totalMoney: 0,
    coupon: { name: "", discount: 0, isValid: false },
    onTogglePopupDiscount: () => {},
    onSubmitCoupon: () => {},
    listCoupons: [
      {
        name: "ABCXYZ123",
        discount: 10000,
        minMoney: 300000,
        isValid: true,
      },
      {
        name: "AAABBBCCC",
        discount: 20000,
        minMoney: 400000,
        isValid: false,
      },
      {
        name: "BBBAAACCC",
        discount: 30000,
        minMoney: 1000000,
        isValid: true,
      },
      {
        name: "CCCAAABBB",
        discount: 40000,
        minMoney: 2000000,
        isValid: false,
      },
    ],
  },

  data: {
    _coupon: { name: "", discount: 0, isValid: false },
  },

  methods: {
    _onTogglePopupDiscount() {
      this.props.onTogglePopupDiscount();
    },

    onChangeCoupon(coupon) {
      if (coupon.name !== this.data._coupon.name) {
        this.setData({ _coupon: coupon });
      } else {
        this.setData({ _coupon: { name: "", discount: 0, isValid: false } });
      }
    },

    _onSubmitCoupon() {
      app.selectCoupon(this.data._coupon);
      this._onTogglePopupDiscount();
    },

    setCoupon() {
      this.setData({ _coupon: this.props.coupon });
    },
  },

  didMount() {
    this.setCoupon();
  },
});
