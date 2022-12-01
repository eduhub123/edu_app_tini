import request from "./request";
import { URL_EDU, URL_CRM } from "./url";

export const getBannersAPI = () => {
  return request({ url: URL_EDU, path: "api/tini-app/homepage-slide" });
};

export const getPackages = () => {
  return request({ url: URL_EDU, path: "api/tini-app/homepage-list-product" });
};

export const getMonkeyStory = () => {
  return request({ url: URL_EDU, path: "api/tini-app/homepage-monkey-story" });
};

export const getDetailByProductId = (productId) => {
  return request({
    url: URL_EDU,
    path: "api/tini-app/get-detail-by-product-id" + "?product_id=" + productId,
  });
};

export const getCustomerReview = (productId, limit, page) => {
  return request({
    url: URL_EDU,
    path: `api/tini-app/get-customer-reviewer?product_id=${productId}&limit=${limit}&page=${page}`,
  });
};

export const getRelatedProduct = (productId) => {
  return request({
    url: URL_EDU,
    path:
      "api/tini-app/get-related-products-by-product-id" +
      "?product_id=" +
      productId,
  });
};

export const postCreateOrder = ({
  fullName = "",
  phone = "",
  email = "",
  customerId = "",
  listProduct = [],
}) => {
  return request({
    url: URL_EDU,
    path: "api/tini-app/create-order",
    method: "POST",
    data: {
      name: fullName,
      phone: phone,
      email: email,
      customer_id: customerId,
      list_product: listProduct,
    },
  });
};

export const getDetailOrder = (orderId) => {
  return request({
    url: URL_EDU,
    path: "api/tini-app/get-detail-order-by-order-id" + "?order_id=" + orderId,
  });
};

export const getCouponTiki = () => {
  return request({
    url: URL_CRM,
    path: "api/get-voucher-tiki",
  });
};
