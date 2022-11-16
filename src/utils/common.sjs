export const moneyFormatter = (number, currency = " ₫") => {
  if (!number) return "0" + currency;
  return parseInt(number).toLocaleString("vi-VN") + currency;
};
