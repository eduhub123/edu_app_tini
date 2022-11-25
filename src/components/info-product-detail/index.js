Component({
  props: {
    contents: [],
  },

  data: {
    isShowMore: false,
    indexMin: 0,
  },

  didMount() {
    const lenght = this.props.contents.length;
    const min = Math.floor(lenght / 2);
    this.setData({
      indexMin: min,
    });
  },

  methods: {
    onToggleShowMore() {
      this.setData({
        isShowMore: !this.data.isShowMore,
      });
    },
  },
});
