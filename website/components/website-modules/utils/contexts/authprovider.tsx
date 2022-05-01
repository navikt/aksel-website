import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext({});

export const AuthenticationStatus = {
  NOT_FETCHED: "NO_FETCHED",
  IS_FETCHING: "IS_FETCHING",
  NOT_AUTHENTICATED: "IS_NOT_AUTHENTICATED",
  IS_AUTHENTICATED: "IS_AUTHENTICATED",
  FAILURE: "FAILURE",
};

export const AuthProvider = (props: any) => {
  const [authStatus, setAuthStatus] = useState(
    AuthenticationStatus.NOT_FETCHED
  );

  const login = () => {
    return null;
  };

  const logout = () => {
    return null;
  };

  const fetchIsAuthenticated = () => {
    setAuthStatus(AuthenticationStatus.IS_FETCHING);

    fetch(`/api/auth`)
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json?.status === 200) {
          setAuthStatus(AuthenticationStatus.IS_AUTHENTICATED);
        } else if (json?.status === 401) {
          setAuthStatus(AuthenticationStatus.NOT_AUTHENTICATED);
        } else {
          setAuthStatus(AuthenticationStatus.FAILURE);
        }
      })
      .catch(() => {
        setAuthStatus(AuthenticationStatus.FAILURE);
      });
  };

  useEffect(() => {
    fetchIsAuthenticated();
  }, []);

  return (
    <AuthenticationContext.Provider
      {...props}
      value={{ user: {}, status: authStatus, login, logout }}
    />
  );
};
