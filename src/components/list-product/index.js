Component ({
  props: {
    listAppId: [],
    chooseAppId: 0,
    onChangeAppId: ()=>{}
  },
  methods: {
    _onChangeAppId(appId) {
      this.props.onChangeAppId(appId);
    },
  }
})