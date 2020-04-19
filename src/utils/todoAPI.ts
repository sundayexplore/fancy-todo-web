import axios from "axios";

import decideApiBaseURL from "@/utils/decideApiBaseURL";

const todoAPI = axios.create({ baseURL: `${decideApiBaseURL()}/todos` });

export default todoAPI;
