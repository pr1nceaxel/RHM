import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        // console.log("Requête envoyée :", config);
        return config;
    },
    (error) => {
        console.error("Erreur dans la requête :", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        // console.log("Réponse reçue :", response);
        return response;
    },
    (error) => {
        console.error("Erreur dans la réponse :", error);
        return Promise.reject(error);
    }
);

export default api;
