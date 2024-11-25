import { API } from "./api";

export const registerUser = async (data: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API.Registration}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
