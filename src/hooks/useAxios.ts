import axios, { AxiosRequestConfig } from "axios";

const port = 7178;
axios.defaults.baseURL = `https://localhost:${port}/api/v1`;

const useAxios = (config: AxiosRequestConfig<any>) => {
  const fetchData = async () => {
    return await (
      await axios.request(config)).data;
  };

  return fetchData;
};

export default useAxios;
