Component({
  props: {
    index: 0,
    name: "",
    color: "",
    image: "",
    price: 0,
    quantity: 1,
    checked: false,
    onChangeQuantity: () => {},
    onTapRemoveProduct: () => {},
    onChooseProduct: () => {},
  },

  methods: {
    _onChangeQuantity(quantity) {
      this.props.onChangeQuantity(this.props.index, quantity);
    },

    _onTapRemoveProduct() {
      this.props.onTapRemoveProduct(this.props.index);
    },

    _onChooseProduct({ detail }) {
      this.props.onChooseProduct(this.props.index, detail.value);
    },
  },
});
