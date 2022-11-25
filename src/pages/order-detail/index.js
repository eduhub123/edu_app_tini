import { redirectTo } from "../../utils/navigate";

Page({
  props: {
    className: "",
  },

  tapGoToHome() {
    redirectTo({
      page: "home",
    });
  },
});
