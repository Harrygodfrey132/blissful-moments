export const API = {
  Registration: "/register",
  Login: "/login",
  VerifyEmail: "/verify-email",
  CheckVerification: "/check-validation",
};

// export const fetchWithAuth = async (url, options = {}) => {
//   const token = localStorage.getItem("authToken");
//   return fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
