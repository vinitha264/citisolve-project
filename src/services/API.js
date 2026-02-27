
const baseURL = 'https://citisolve-smarter-complaint-resolution.onrender.com/api/';

const callAPI = async (endpoint, options) => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(errorData.message || "Unknown error occurred");
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error.message);
    throw error; // rethrow so caller can handle it
  }
};

export const authAPI = {
  register: (userData) =>
    callAPI("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    callAPI("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }),
};
