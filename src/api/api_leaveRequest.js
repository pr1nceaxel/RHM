import api from "../libs/axios";

export const getLeaveRequests = async () => {
    try {
        const response = await api.get('/leave')
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
      }
    };