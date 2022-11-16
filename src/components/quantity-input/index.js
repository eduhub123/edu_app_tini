Component({
  props: {
    value: 1,
    onChange: () => {},
  },
  data: {
    valueInput: 1,
  },

  methods: {
    _onReduceQuantity() {
      this._onChange(this.props.value - 1);
    },

    _onIncreasingQuantity() {
      this._onChange(this.props.value + 1);
    },

    _onChange(quantity) {
      if (quantity >= 1 && quantity <= 9999) {
        this.props.onChange(quantity);
      } else if (quantity < 1) {
        this.props.onChange(1);
      } else {
        this.props.onChange(9999);
      }
    },

    onChangeInput(event) {
      const value = event.detail.value;
      this._onChange(Number(value));
    },
  },

  didMount() {
    this.setData({
      valueInput: this.props.value,
    });
  },

  didUpdate() {
    this.setData({
      valueInput: this.props.value,
    });
  },
});
