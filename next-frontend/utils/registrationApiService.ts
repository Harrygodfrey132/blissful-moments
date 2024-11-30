import axios from "axios";
import { API } from "./api";

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${API.Registration}`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error(error.message);
  }
};
