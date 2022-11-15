Component({
  props: {
    title: "",
    className: "",
    onTap: () => {},
    type: "solid",
  },
  methods: {
    _onTap() {
      this.props.onTap();
    },
  },
});
