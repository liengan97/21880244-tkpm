import { useEffect, useState } from "react";

import Geolocation from '@react-native-community/geolocation';
import { useAndroidPermissions } from '../hooks/useAndroidPermission';
import { Location } from '../@types'
import { useUser } from "./useUser";

export const useCurrentLocation = () => {
  const [error, setError] = useState();
  const [, grant] = useAndroidPermissions();
  const [location, setLocation] = useState<Location>();
  const [loading, setLoading] = useState(true);

  const {  } = useUser();

  useEffect(() => {
    if (!grant) {
      console.log("LOCATION GRANT: -->>> [FALSE]");
    }
  }, []);

  useEffect(() => {
    const internal = setInterval(() => {
      try {
        Geolocation.getCurrentPosition(onSuccess, onError);
      } finally {
        // Only initial location need it
        setLoading(false);
      }
    }, 4000);

    // Need to clear internal
    return () => clearInterval(internal);
  }, []);

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

  return { loading, error, location };
};