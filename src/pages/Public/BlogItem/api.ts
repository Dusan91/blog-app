import axios from "../../../config/axios";

const API = {
  getArticle(id: number) {
    return axios.get(`/api/articles/${id}`);
  },
  getArticleComments(id: number) {
    return axios.get(`/api/articles/${id}/comments`);
  },
  getArticleCategory(id: number) {
    return axios.get(`/api/categories/${id}`);
  },
};

export default API;
