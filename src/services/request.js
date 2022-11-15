export const request = async ({
  path = "",
  method = "GET",
  headers = {},
  data,
  url,
}) => {
  return new Promise((resolve, reject) => {
    my.request({
      url: url + path,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method,
      data,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default request;
