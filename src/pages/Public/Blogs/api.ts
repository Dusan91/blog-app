import axios from "../../../config/axios";

const API = {
  getArticles(page?: number) {
    const urlSearchParams = new URLSearchParams();
    if (page) urlSearchParams.append("page", String(page));
    const url = `/api/articles${!page ? "" : `?${urlSearchParams}`}`;
    return axios.get(url);
  },
};

export default API;
