import api from "../libs/axios";


export const getDepartements = async () => {
    try {
        const response = await api.get("/departement");
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const createDepartement = async (name, managerId, location, budget, description ) => {
    try {
        const response = await api.post("/departement", {
            name : name,
            managerId: managerId,
            location: location,
            budget: budget,
            description: description
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}