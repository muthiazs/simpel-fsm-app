import axios from "axios";

const API_URL = "http://localhost:3001/api"; // Sesuaikan dengan URL backend

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};
