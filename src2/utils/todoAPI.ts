import axios from "axios";

import decideApiBaseURL from "@/utils/decideApiBaseURL";

const todoAPI = axios.create({
  baseURL: `${decideApiBaseURL()}/todos`,
  withCredentials: true
});

export default todoAPI;
