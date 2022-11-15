import { navigateWithParams } from "../../utils/navigate";

Component({
  methods: {
    onTapFacebook() {
      navigateWithParams({
        page: "contact-monkey",
        params: {
          myUrl: "https://www.facebook.com/Monkey.edu.vn",
        },
      });
    },
    onTapYoutube() {
      navigateWithParams({
        page: "contact-monkey",
        params: {
          myUrl: "https://www.youtube.com/channel/UCgJVidrhmAp0w_B0apM08OA",
        },
      });
    },
  },
});
