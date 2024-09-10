import axios from "axios";

export const request = (url, type, data, headers, formData) =>
  new Promise(async (resolve, reject) => {
    const requestObj = {
      method: type,
      url: process.env.REACT_APP_BACKEND_URL + url,
      headers: {
        "content-type": formData ? "multipart/form-data" : "application/json",
        "x-auth-token": "",
      },
      data: {},
    };
    if (headers) {
      if (headers.contentType) {
        requestObj.headers["content-type"] = headers.contentType;
      }
    }
    type !== "get" && (requestObj.data = data);
    // params && (requestObj.params = params);
    if (!requestObj.url.includes("refresh")) {
      axios(requestObj).then(resolve, reject);
    }
  });
