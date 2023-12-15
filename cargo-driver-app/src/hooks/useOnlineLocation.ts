import { useEffect, useRef, useState } from "react";

import Geolocation from '@react-native-community/geolocation';
import { Location } from '../@types'
import { useUser } from "./useUser";

export const useOnlineLocation = () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState<Location>();

  const intervalRef = useRef<any>();

  const { isOnline } = useUser();

  useEffect(() => {
    if (isOnline) {

      intervalRef.current = setInterval(() => {
        try {
          Geolocation.getCurrentPosition(onSuccess, onError);
        } catch (error) {
          console.log(error);
        }
      }, 4000)
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isOnline]);

  const onSuccess = (position: any) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  }

  const onError = (error: any) => {
    setError(error);
  }

  return { error, location };
};