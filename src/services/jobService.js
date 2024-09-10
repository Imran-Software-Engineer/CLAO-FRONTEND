import { request } from "./config";

export const getJobs = () => {
  return request("/jobs", "get", null, true, false)
    .then(async ({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.error(error.response.data, error);
      return error.response.data;
    });
};

export const createJob = () => {
  return request("/jobs", "post", {}, true, false)
    .then(async ({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.error(error.response.data, error);

      return error.response.data;
    });
};

export const getJobById = (param) => {
  return request(`/jobs/${param}`, "get", null, true, false)
    .then(async ({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.error(error.response.data, error);

      return error.response.data;
    });
};
