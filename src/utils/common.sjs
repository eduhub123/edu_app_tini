export const moneyFormatter = (number, currency = ' ₫') => {
  if (!number) return '';
  return parseInt(number).toLocaleString('vi-VN') + currency;
};