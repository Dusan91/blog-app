import axios from "../../../config/axios";
import { CreateEditArticle } from "../../../utils/commonInterfaces";

const AuthorizedApi = (url: string) => {
  const token = localStorage.getItem("user");
  return `${url}?api_token=${token}`;
};
const API = {
  getArticles(page?: number) {
    const urlSearchParams = new URLSearchParams();
    if (page) urlSearchParams.append("page", String(page));
    const url = `/api/articles${!page ? "" : `?${urlSearchParams}`}`;
    return axios.get(url);
  },
  getCategories() {
    return axios.get("/api/categories");
  },
  saveArticle(data: CreateEditArticle, id?: number) {
    if (id) return axios.put(AuthorizedApi(`/api/articles/${id}`), data);
    return axios.post(AuthorizedApi(`/api/articles`), data);
  },
  deleteArticle(id: number) {
    return axios.delete(AuthorizedApi(`/api/articles/${id}`));
  },
};

export default API;
