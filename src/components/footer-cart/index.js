Component({
  props: {
    titleButton: "",
    totalQuantity: 0,
    onTapBuyNow: () => {},
  },
  data: {
    showPopupDiscount: false,
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
