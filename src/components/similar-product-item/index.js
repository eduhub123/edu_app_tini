import { navigateWithParams } from "../../utils/navigate";

Component({
  props: {
    id: "",
    color: "",
    image: "",
    name: "",
    price: 0,
    promotion: 0,
  },

  methods: {
    onTapSimularProduct() {
      navigateWithParams({
        page: "product-detail",
        params: {
          productId: this.props.id,
        },
      });
    },
  },
});
