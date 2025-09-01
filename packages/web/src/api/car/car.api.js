import axiosClient from "../axiosClient";

const carApi = {
  getAll: () => {
    const url = "/cars";
    return axiosClient.get(url).then((response) => response.data);
  },

  getBySku: (sku) => {
    const url = `/cars/${sku}`;
    return axiosClient.get(url).then((response) => response.data);
  },
};

export default carApi;
