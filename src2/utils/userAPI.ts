import axios from "axios";

import decideApiBaseURL from "@/utils/decideApiBaseURL";

const userAPI = axios.create({
  baseURL: `${decideApiBaseURL()}/users`,
  withCredentials: true
});

export default userAPI;
