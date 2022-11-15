import request from "./request";
import { URL_EDU } from "./url";

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
