import queryString from "query-string";

Page({
  data: {
    url: "",
  },
  onLoad(query) {
    const { myUrl } = queryString.parse(query);
    this.setData({
      url: myUrl,
    });
  },
});
