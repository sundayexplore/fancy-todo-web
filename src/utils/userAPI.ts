import axios from 'axios';

import { ApiBaseURL } from "@/utils";

const userAPI = axios.create({baseURL: `${ApiBaseURL}/users`});

export default userAPI;
