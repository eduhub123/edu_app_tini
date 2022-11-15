import { navigateWithParams } from "../../utils/navigate";

Component({
  methods: {
    onTapContactMonkey() {
      navigateWithParams({
        page: "contact-monkey",
        params: {
          myUrl: "https://tinyurl.com/tiki-daily",
        },
      });
    },
  },
});
