Component({
  props: {
    checked: false,
    totalMoney: 0,
    value: {
      banner: "",
      discount_money: 0,
      discount_percent: 0,
      price: 0,
      group_voucher_id: "",
      time_end: 0,
    },
    onChangeCoupon: () => {},
  },

  methods: {
    _onChangeCoupon() {
      this.props.onChangeCoupon(this.props.value);
    },
  },
});
