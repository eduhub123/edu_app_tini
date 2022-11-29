Component({
  props: {
    title: "",
    className: "",
    listProduct: [],
    error: "",
  },

  data: {
    products: [],
  },

  didMount() {
    const list = this.props.listProduct.map((item) => {
      const url = item.image.replace("miniapp-resource://", "https://");
      return {
        ...item,
        image: url,
      };
    });
    this.setData({
      products: list,
    });
  },
});
