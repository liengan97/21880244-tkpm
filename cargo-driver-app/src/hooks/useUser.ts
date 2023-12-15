import { useContext } from "react";
import { CargoContextType, CargoContext } from "../context/CargoContext";
import { User } from "../@types";

export const useUser = () => {

  const { loading, user, setUser } = useContext(CargoContext) as CargoContextType;

  const setOnline = (isOnline: boolean) => {
    setUser({ ...user, isOnline } as User)
  }

  const setOnGoingTrip = (onGoingTrip: any) => {
    setUser({ ...user, onGoingTrip } as User)
  }

  return {
    loading,
    email: user?.email,
    isOnline: user?.isOnline,
    onGoingTrip: user?.onGoingTrip,
    setOnline,
    setOnGoingTrip,
  };
};