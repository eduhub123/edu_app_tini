Component({
  props: {
    listProduct: [],
  },

  didMount() {
    console.log(this.props.listProduct);
  },
});
