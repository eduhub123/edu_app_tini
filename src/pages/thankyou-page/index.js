import { navigateWithParams } from "../../utils/navigate";

Page({
  data: {},
  goToOrderDetail() {
    navigateWithParams({
      page: "order-detail",
    });
  },
});
