import { useContext } from "react";
import useApi from "./useApi";
import { CargoContextType, CargoContext, CargoState } from "../context/CargoContext";
import { JwtPayload, jwtDecode } from 'jwt-decode';

export const useAuth: any = () => {
  const api = useApi();
  const { loading, authTokens, user, setCargoState } = useContext(CargoContext) as CargoContextType;

  const login = async (email: string, password: string) => {
    return api
      .post('/auth/login', { email, password, userType: 'driver' })
      .then(({ data }) => {
        console.log("data: ", data)
        if (data.error) {
          return Promise.reject(data.error);
        }

        let { data: tokens } = data;
        const decodedToken: any = jwtDecode<JwtPayload>(tokens.accessToken);
        setCargoState((prevState: CargoState) => ({
          ...prevState,
          authTokens: tokens,
          user: {
            ...user,
            email: decodedToken.email,
          },
        }))
        return Promise.resolve(user);
      })
      .catch(error => {
        return Promise.reject(error);
      })
  };

  const logout = async () => {
    return api
      .post('/auth/logout', { email: user?.email, userType: 'driver' })
      .then((_) => {
        setCargoState((prevState: CargoState) => ({
          ...prevState,
          user: null,
          authTokens: null,
        }))
        return Promise.resolve(user);
      })
      .catch(error => {
        return Promise.reject(error);
      })
  };

  const refresh = () => {
    return api
      .post('/auth/refresh', {})
      .then(({ data }) => {
        setCargoState((prevState: CargoState) => ({
          ...prevState,
          authTokens: data.data,
        }))
        return Promise.resolve(user);
      })
      .catch(error => {
        return Promise.reject(error);
      })
  }

  return {
    loading,
    login, logout, authTokens, authenticated: user != null,
    refresh
  };
};