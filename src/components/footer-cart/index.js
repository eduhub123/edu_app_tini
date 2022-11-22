Component({
  props: {
    titleButton: "",
    totalQuantity: 0,
    totalMoney: 0,
    disabled: false,
    isLoading: false,
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
