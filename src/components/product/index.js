Component({
  props: {
    index: "",
    appId: "",
    name: "",
    image: "",
    color: "",
    styleName: "",
    onChangeAppId: () => {},
  },

  methods: {
    _onChangeAppId() {
      this.props.onChangeAppId(this.props.appId);
    },
  },
});
