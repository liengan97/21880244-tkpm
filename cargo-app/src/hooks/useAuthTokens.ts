import { useContext } from "react";
import { CargoContextType, CargoContext } from "../context/CargoContext";

export const useAuthTokens = () => {

  const { loading, authTokens, setAuthTokens } = useContext(CargoContext) as CargoContextType;

  return {
    loading,
    accessToken: authTokens?.accessToken,
    refreshToken: authTokens?.refreshToken,
    setAuthTokens
  };
};