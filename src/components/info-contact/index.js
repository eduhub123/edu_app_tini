Component({
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
  },
});
