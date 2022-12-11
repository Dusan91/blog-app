import axios from "../../../../../config/axios";

const API = {
  getArticleComments(id: number) {
    return axios.get(`/api/articles/${id}/comments`);
  },
};

export default API;
