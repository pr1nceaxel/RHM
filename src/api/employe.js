import api from "../libs/axios";


export const getEmployees = async () => {
  try {
    const response = await api.get("/employe");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const createEmployee = async ({
  flag,
  comments, 
  firstName,
  lastName,
  dateOfBirth,
  placeOfBirth,
  address,
  gender,
  phoneNumber,
  email,
  departmentId,
  positionId,
  contractType,
  salary,
  socialSecurityNumber,
  emergencyContactName,
  emergencyContactPhone,
  emergencyContactlastName,
  emergencyContactEmail,
  emergencyContactAdress
}) => {
  try {
    const response = await api.post("/employe", {
      flag,
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth).toISOString(),
      placeOfBirth,
      phoneNumber: phoneNumber || null, 
      email,
      address,
      gender,
      departmentId,
      positionId,
      contractType,
      salary: salary, 
      socialSecurityNumber,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactlastName,
      emergencyContactEmail,
      emergencyContactAdress,
      comments: comments || "", 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await api.get(`/employe/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/employe/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}