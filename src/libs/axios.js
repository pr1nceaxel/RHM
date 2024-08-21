import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.PROD 
        ? import.meta.env.VITE_API_URL_PROD 
        : import.meta.env.VITE_API_URL_DEV,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error("Erreur dans la requête :", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Erreur dans la réponse :", error);
        return Promise.reject(error);
    }
);

export default api;
