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
      console.log(this.props.id);
      navigateWithParams({
        page: "product-detail",
        params: {
          productId: this.props.id,
        },
      });
    },
  },
});
