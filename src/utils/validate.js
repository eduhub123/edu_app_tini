const REGEX_NAME =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\ ]+$/g;
const REGEX_PHONE = /(0[3|5|7|8|9])+([0-9]{4,8})\b/g;
const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const checkName = (name) => {
  const _name = name ? name.trim() : "";
  if (_name.length <= 0) {
    return "Họ tên không được để trống";
  }

  if (_name.length < 3 || _name.length > 50) {
    return "Độ dài họ tên lớn hơn 3 ký tự và nhỏ hơn 50 ký tự";
  }

  if (!_name.match(REGEX_NAME)) {
    return "Họ tên chứa ký tự không hợp lệ";
  }

  return "pass";
};

export const checkPhone = (phone) => {
  const _phone = phone ? phone.trim() : "";
  if (_phone.length <= 0) {
    return "Số điện thoại không được để trống";
  }

  if (_phone.length !== 10) {
    return "Số điện thoại phải chứa 10 ký tự";
  }

  if (!_phone.match(REGEX_PHONE)) {
    return "Số điện thoại phải là đầu số Việt Nam";
  }

  return "pass";
};

export const checkEmail = (email) => {
  const _email = email ? email.trim() : "";
  if (_email.length <= 0) {
    return "Email không được để trống";
  }

  if (_email.length > 100) {
    return "Độ dài email không hợp lệ";
  }

  if (!_email.match(REGEX_EMAIL)) {
    return "Email không hợp lệ";
  }

  return "pass";
};
