export const moneyFormatter = (number, currency = " ₫") => {
  if (!number) return "";
  return parseInt(number).toLocaleString("vi-VN") + currency;
};
import { URL_MEDIA } from "../services/url";

export function setNavigationBar() {
  const app = getApp();

  const totalQuantity = app.cart.totalQuantity;
  my.addIconsToNavigationBar({
    icons: [
      {
        image: "/public/assets/icons/ic_cart.png",
        badge: "" + totalQuantity,
        width: 20,
        height: 20,
      },
    ],
    padding: 10,
  });
}

export function setTitleNavigationBar() {
  my.setNavigationBar({
    image: URL_MEDIA + "tini_app/LOGO_MONKEY.png",
    title: " ",
  });
}

export const isObjectEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
