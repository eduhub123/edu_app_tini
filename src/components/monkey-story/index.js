import parse from "@tiki.vn/mini-html-parser2";

Component({
  props: {
    content: {},
  },

  data: {
    contentConvert: [],
  },

  didMount() {
    parse(this.props.content.content, (err, nodes) => {
      if (!err) {
        this.setData({
          contentConvert: nodes,
        });
      }
    });
  },
});
