Component({
  props: {
    show: false,
    onClose: () => {},
  },
  methods: {
    _onClose() {
      this.props.onClose();
    },
  },
});
