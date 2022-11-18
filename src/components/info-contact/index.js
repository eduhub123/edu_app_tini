Component({
  props: {
    customerInfo: {
      fullName: "",
      phone: "",
      email: "",
    },
    error: "",
    onChangeCustomerInfo: () => {},
  },

  data: {
    showPopupEdit: false,
  },

  methods: {
    onShowPopupEdit() {
      this.setData({
        showPopupEdit: true,
      });
    },

    onHidePopupEdit() {
      this.setData({
        showPopupEdit: false,
      });
    },

    _onChangeCustomerInfo(data) {
      this.props.onChangeCustomerInfo(data);
      this.onHidePopupEdit();
    },
  },
});
