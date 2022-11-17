import { checkName, checkPhone, checkEmail } from "../../utils/validate";

Component({
  props: {
    show: false,
    onClose: () => {},
    customerInfo: {
      fullName: "",
      phone: "",
      email: "",
    },
    onChangeCustomerInfo: () => {},
  },
  data: {
    dataForm: {
      fullName: "",
      phone: "",
      email: "",
    },
    errors: {
      fullName: "",
      phone: "",
      email: "",
    },
  },

  methods: {
    _onClose() {
      this.props.onClose();
    },

    _onChangeCustomerInfo() {
      this.onCheckName(this.data.dataForm.fullName);
      this.onCheckPhone(this.data.dataForm.phone);
      this.onCheckEmail(this.data.dataForm.email);
      const errors = this.data.errors;
      if (!errors.fullName && !errors.phone && !errors.email) {
        this.props.onChangeCustomerInfo(this.data.dataForm);
      }
    },

    onChangeName({ detail }) {
      this.setData({
        dataForm: { ...this.data.dataForm, fullName: detail.value },
      });
      this.onCheckName(detail.value);
    },

    onChangePhone({ detail }) {
      this.setData({
        dataForm: { ...this.data.dataForm, phone: detail.value },
      });
      this.onCheckPhone(detail.value);
    },

    onChangeEmail({ detail }) {
      this.setData({
        dataForm: { ...this.data.dataForm, email: detail.value },
      });
      this.onCheckEmail(detail.value);
    },

    onCheckName(value) {
      const checkResult = checkName(value);
      if (checkResult === "pass") {
        this.setData({
          errors: { ...this.data.errors, fullName: "" },
        });
      } else {
        this.setData({
          errors: { ...this.data.errors, fullName: checkResult },
        });
      }
    },

    onCheckPhone(value) {
      const checkResult = checkPhone(value);

      if (checkResult === "pass") {
        this.setData({
          errors: { ...this.data.errors, phone: "" },
        });
      } else {
        this.setData({
          errors: { ...this.data.errors, phone: checkResult },
        });
      }
    },

    onCheckEmail(value) {
      const checkResult = checkEmail(value);

      if (checkResult === "pass") {
        this.setData({
          errors: { ...this.data.errors, email: "" },
        });
      } else {
        this.setData({
          errors: { ...this.data.errors, email: checkResult },
        });
      }
    },
  },

  didMount() {
    this.setData({ dataForm: this.props.customerInfo });
  },
});
