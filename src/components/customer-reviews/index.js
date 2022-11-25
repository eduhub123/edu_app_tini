import { navigateWithParams } from "../../utils/navigate";

Component({
  props: {
    reviews: [],
  },

  methods: {
    goToReview() {
      navigateWithParams({
        page: "review",
      });
    },
  },
});
