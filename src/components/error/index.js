Component({
  props: {
    message: "",
  },

  methods: {
    callSuport() {
      my.makePhoneCall({
        number: 1900636052,
      });
    },
  },
});
