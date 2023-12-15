import React, { useEffect, useRef, useState } from 'react';
import * as Keychain from 'react-native-keychain';

import { AuthTokens, User } from '../@types';

type Props = {
  children: React.ReactNode
}

export type CargoState = {
  loading: boolean,
  user: User | null,
  authTokens: AuthTokens | null,
}

export type CargoContextType = {
  loading: boolean,
  user: User | null,
  authenticated: boolean,
  authTokens: AuthTokens | null,
  setUser: (user: User | null) => any
  setAuthTokens: (authTokens: AuthTokens | null) => void,
  setCargoState: Function
}

const CargoContext = React.createContext<CargoContextType | null>(null);

const CargoProvider = ({ children }: Props) => {
  const initialRef = useRef<boolean>(true);
  const [cargoState, setCargoState] = useState<CargoState>({
    loading: true,
    user: null,
    authTokens: null,
  })

  useEffect(() => {
    // TODO Handle errors
    const fetchedStoredState = async () => {
      const persisted = await Keychain.getGenericPassword();
      setCargoState({
        ...cargoState,
        ...(persisted ? JSON.parse(persisted.password) : undefined),
        loading: false
      })
      initialRef.current = false;
    }
    fetchedStoredState();
  }, [])

  useEffect(() => {
    const persist = async () => {
      await Keychain.setGenericPassword('CARGO_GLOBAL_STATE', JSON.stringify(cargoState));
    }

    if (!initialRef.current) {
      persist();
    }
  }, [cargoState])

  const setUser = (user: User | null) => {
    setCargoState({
      ...cargoState,
      user,
    })
  }

  const setAuthTokens = (authTokens: AuthTokens | null) => {
    setCargoState({
      ...cargoState,
      authTokens
    })
  }

  const { loading, user, authTokens } = cargoState;

  return (
    <CargoContext.Provider value={{ loading, authenticated: user != null, user, setUser, authTokens, setAuthTokens, setCargoState }}>
      {children}
    </CargoContext.Provider>
  );
};

export { CargoContext, CargoProvider };
