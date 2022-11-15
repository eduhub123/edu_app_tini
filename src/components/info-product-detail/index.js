Component({
  data: {
    isShowMore: false,
    indexMin: 0,
  },
  props: {
    contents: [],
  },
  methods: {
    onToggleShowMore() {
      this.setData({
        isShowMore: !this.data.isShowMore,
      });
    },
  },
  didMount() {
    const lenght = this.props.contents.length;
    const min = Math.floor(lenght / 2);
    this.setData({
      indexMin: min,
    });
  },
});
