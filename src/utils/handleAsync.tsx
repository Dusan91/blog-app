import { message } from "antd";
import { AxiosResponse } from "axios";

const HandleAsync = async (callback: Promise<AxiosResponse<any, any>>) => {
  const response = await callback;
  if (response.status === 400) return message.error(`Bad request`);
  if (response.status === 404) return message.error(`Not found`);
  if (response.status === 200) return "success";
  return null;
};

export default HandleAsync;
