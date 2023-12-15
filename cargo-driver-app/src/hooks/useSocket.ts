import { useEffect, useState } from "react";
import socket from "../socket";
import { useAuthTokens } from "./useAuthTokens";
import useApi from "./useApi";

export default function useSocket() {

  const [connected, setConnected] = useState(socket.connected);
  const [isReconnecting, setReconnecting] = useState(false);
  const { accessToken } = useAuthTokens();
  const [ping, setPing] = useState(false);
  const [error, setError] = useState<any>();
  const [reconnectFailed, setReconnectedFailed] = useState(false);
  const api = useApi();

  useEffect(() => {
    if (ping && error?.message?.startsWith('TokenExpiredError')) {
      api.get("/ping")
        .then(() => {
          setError(null);
          socket.connect();
        })
        .catch((err) => console.error(err))
        .finally(() => setPing(false));
    }
  }, [ping])

  useEffect(() => {
    socket.io.opts.query = { accessToken };
  }, [accessToken]);

  useEffect(() => {
    socket.on('connect', () => {
      afterConnected();
    })

    socket.on('disconnect', (reason) => {
      afterDisconnected(reason);
    })

    socket.io.on('reconnect', (v) => {
      setReconnecting(true);
    })

    socket.io.on('error', (error) => {
      console.log(error, error.message)
    })

    socket.on('connect_error', (error) => {
      console.log(error, error.message)
      setError(error);
      setPing(error?.message.startsWith('TokenExpiredError'));
    })

    socket.io.on("reconnect_error", (error) => {
      console.log('reconnect_error', error)
    });

    socket.io.on("reconnect_failed", () => {
      console.error('[Reonnected Failed]')
      setReconnectedFailed(true);
    });

  }, []);

  const afterConnected = () => {
    console.log("[socket] - connected to the server - ", socket.id);
    setReconnecting(false);
    setConnected(true);
  }

  const afterDisconnected = (reason: any) => {
    console.log("[socket] - disconnected to the server - ", reason);
    setConnected(false);
    setReconnecting(false);
  }

  return {
    socket,
    connected,
    isReconnecting,
    reconnectFailed
  }
}