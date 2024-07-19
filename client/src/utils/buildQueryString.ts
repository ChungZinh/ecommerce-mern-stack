export const buildQueryString = (queryObject: { [key: string]: any }) => {
    const queryString = Object.keys(queryObject)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`
      )
      .join("&");
    return `?${queryString}`;
  };