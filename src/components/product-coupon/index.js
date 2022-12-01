const app = getApp();

Component({
  props: { product: {} },

  methods: {
    onChangeCoupon(coupon) {
      app.selectCoupon(this.props.product, coupon);
    },
  },
});
