export const setAuthData = (user, token) => {
  localStorage.setItem("meUserData", JSON.stringify(user));
  localStorage.setItem("meAuthToken", token);
};

export const getAuthData = () => {
  const userData = localStorage.getItem("meUserData");
  const authToken = localStorage.getItem("meAuthToken");
  
  if (userData && authToken) {
    try {
      return {
        user: JSON.parse(userData),
        token: authToken
      };
    } catch (error) {
      console.error("Error parsing auth data:", error);
      clearAuthData();
      return null;
    }
  }
  return null;
};

export const clearAuthData = () => {
  localStorage.removeItem("meUserData");
  localStorage.removeItem("meAuthToken");
};

export const isAuthenticated = () => {
  const authData = getAuthData();
  return authData !== null;
};
