export const moneyFormatter = (number, currency = " ₫") => {
  if (!number) return "";
  return parseInt(number).toLocaleString("vi-VN") + currency;
};
import { URL_MEDIA } from "../services/url";

const app = getApp();

export function setNavigationBar() {
  const quantityCart = app.cart.orderedProducts.lenght;
  my.addIconsToNavigationBar({
    icons: [
      {
        image: "/public/assets/icons/cart.svg",
        badge: String(quantityCart),
      },
    ],
    padding: 10,
  });
  my.setNavigationBar({
    image: URL_MEDIA + "tini_app/LOGO_MONKEY.png",
    title: " ",
  });
}

export const isObjectEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
