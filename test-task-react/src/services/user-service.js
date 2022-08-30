import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://reqres.in/api/"

const getAllUsers = () => {
    return axios.get(API_URL + "users", { headers: authHeader() })
}

const getOnePageUsers = (page) => {
    return axios.get(API_URL + "users?page=" + page, { headers: authHeader() })
}

const getUsersById = (id) => {
    return axios.get(API_URL + "users/" + id, { headers: authHeader() })
}

export default {
    getAllUsers,
    getOnePageUsers,
    getUsersById,
};