import axios from "axios";

const port = 7178;
const url = `https://localhost:${port}/api/v1`;

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});
