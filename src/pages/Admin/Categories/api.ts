import axios from "../../../config/axios";
import { CreateEditCategory } from "../../../utils/commonInterfaces";

const AuthorizedApi = (url: string) => {
  const token = localStorage.getItem("user");
  return `${url}?api_token=${token}`;
};
const API = {
  getCategories(page?: number) {
    const urlSearchParams = new URLSearchParams();
    if (page) urlSearchParams.append("page", String(page));
    const url = `/api/categories${!page ? "" : `?${urlSearchParams}`}`;
    return axios.get(url);
  },
  saveCategory(data: CreateEditCategory, id?: number) {
    if (id) return axios.put(AuthorizedApi(`/api/categories/${id}`), data);
    return axios.post(AuthorizedApi(`/api/categories`), data);
  },
  deleteCategory(id: number) {
    return axios.delete(AuthorizedApi(`/api/categories/${id}`));
  },
};

export default API;
