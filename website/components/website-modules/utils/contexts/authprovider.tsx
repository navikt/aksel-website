import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext({});

export const AuthenticationStatus = {
  NOT_FETCHED: "NO_FETCHED",
  NOT_AUTHENTICATED: "IS_NOT_AUTHENTICATED",
  IS_AUTHENTICATED: "IS_AUTHENTICATED",
  FAILURE: "FAILURE",
};

export const AuthProvider = (props: any) => {
  const [state, setState] = useState<{
    status: string;
    user?: { name: string; mail: string };
  }>({ status: AuthenticationStatus.NOT_FETCHED });

  const login = () => {
    return null;
  };

  const logout = () => {
    return null;
  };

  const fetchIsAuthenticated = () => {
    fetch(`/api/auth`)
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json?.status === 200) {
          setState({
            status: AuthenticationStatus.IS_AUTHENTICATED,
            user: { name: json?.name, mail: json?.mail },
          });
        } else if (json?.status === 401) {
          setState({
            status: AuthenticationStatus.NOT_AUTHENTICATED,
          });
        } else {
          setState({
            status: AuthenticationStatus.FAILURE,
          });
        }
      })
      .catch(() => {
        setState({
          status: AuthenticationStatus.FAILURE,
        });
      });
  };

  useEffect(() => {
    fetchIsAuthenticated();
  }, []);

  return (
    <AuthenticationContext.Provider
      {...props}
      value={{ user: state?.user, status: state.status, login, logout }}
    />
  );
};
