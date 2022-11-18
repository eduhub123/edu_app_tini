import { navigateWithParams } from "../../utils/navigate";

Component({
  methods: {
    onTapContactMonkey() {
      my.openNativeAppStore({
        appleStoreId: "1633038599",
        googlePlayId: "4972139065721812308",
      });
    },
  },
});
