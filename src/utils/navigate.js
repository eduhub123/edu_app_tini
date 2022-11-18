import queryString from "query-string";

export const navigateWithParams = ({ page, params = null }) => {
  my.navigateTo({
    url: `${queryString.stringifyUrl({
      url: `pages/${page}/index`,
      query: params,
    })}`,
  });
};

export const reLaunch = ({ page, params = null }) => {
  my.reLaunch({
    url: `${queryString.stringifyUrl({
      url: `pages/${page}/index`,
      query: params,
    })}`,
  });
};

export const redirectTo = ({ page, params = null }) => {
  my.redirectTo({
    url: `${queryString.stringifyUrl({
      url: `pages/${page}/index`,
      query: params,
    })}`,
  });
};
