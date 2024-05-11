import { IconTrendingUp } from "@tabler/icons-react-native";
import axios from "axios";
const BASE_URL = 'https://task-management-opll.onrender.com/api';

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    // headers: { 'Content-Type': 'application/json', },
    // withCredentials: true
})