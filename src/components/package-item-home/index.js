Component({
  props: {
    id: "",
    image: "",
    color: "",
    packageName: "",
    price: 0,
    promotion: 0,
    onTapPackage: () => {},
  },

  methods: {
    _onTapPackage() {
      this.props.onTapPackage(this.props.id);
    },
  },
});
