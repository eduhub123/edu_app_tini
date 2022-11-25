import queryString from "query-string";

Page({
  data: {
    url: "",
  },

  onLoad(query) {
    this.webviewContext = my.createWebViewContext("web-view1");
    const { myUrl } = queryString.parse(query);
    this.setData({
      url: myUrl,
    });
  },
});
