Component({
  props: {
    title: "",
    className: "",
    type: "solid",
    disabled: false,
    onTap: () => {},
  },

  methods: {
    _onTap() {
      !this.props.disabled ? this.props.onTap() : () => {};
    },
  },
});
