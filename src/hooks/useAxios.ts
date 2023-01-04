import axios from "axios";

const port = 7178;
axios.defaults.baseURL = `http://192.168.0.38:${port}/api/v1`;

interface Props {
  url: string;
  method: "get" | "put" | "post" | "delete";
  body?: string | null;
  headers?: string | null;
}

const useAxios = ({ url, method, body, headers }: Props) => {
  const fetchData = async () => {
    return (
      await axios[method](url, headers ? JSON.parse(headers) : null, body ? JSON.parse(body) : null)
    ).data;
  };

  return fetchData;
};

export default useAxios;
