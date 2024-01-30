import { createContext, useContext, useEffect, useState } from "react";

//context api use here//
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState([]);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;
  const API = import.meta.env.VITE_APP_URI_API;
  const storeTokenInLS = (servertoken) => {
    setToken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  let isLoggedIn = !!token;
  //tackle logout user//
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //JWT Authentication //

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("fetching errro");
      // setIsLoading(false);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.msg);
        setServices(data.msg);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        contact,
        services,
        authorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//made custom hook here //
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
