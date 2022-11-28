import dayjs from "dayjs";

export const moneyFormatter = (number, currency = " ₫") => {
  if (!number) return "0" + currency;
  return parseInt(number).toLocaleString("vi-VN") + currency;
};

export const formatTime = (timeStamp) => {
  const time = dayjs.unix(timeStamp).format("HH:mm, DD/MM/YYYY");
  return time;
};
