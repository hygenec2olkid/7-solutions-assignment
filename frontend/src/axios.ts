// axios.ts
import axios from "axios";
import { configure } from "axios-hooks";

const BASE_API_URL = "https://dummyjson.com/users";

const apiUrl = import.meta.env.VITE_API_URL ?? BASE_API_URL;

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";

configure({ axios });
