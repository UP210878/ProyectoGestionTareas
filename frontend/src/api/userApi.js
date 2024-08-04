import { API_URL } from "./config";

const login = async (loginData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    const fullresponse = await response.json();
    if (response.ok) {
        return fullresponse;
      } else {
        throw new Error(fullresponse.message);
      }
}

const userApi = {
    login,
};

export default userApi;