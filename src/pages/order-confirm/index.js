import { navigateWithParams } from "../../utils/navigate";

Page({
  onPayment() {
    navigateWithParams({
      page: "thankyou-page",
    });
  },
});
