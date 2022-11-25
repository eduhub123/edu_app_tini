Component({
  props: {
    checked: false,
    totalMoney: 0,
    value: {
      name: "",
      discount: 0,
      minMoney: 0,
      isValid: false,
    },
    onChangeCoupon: () => {},
  },

  methods: {
    _onChangeCoupon() {
      this.props.onChangeCoupon(this.props.value);
    },
  },
});
