import { useSession } from "next-auth/react"
import { axiosAuth } from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const { data } = await axiosAuth.post("/auth/refresh-token", {
      refreshToken: session?.user.refreshToken
    });

    if (session) {
      session.user.accessToken = data.accessToken;
    }
  }

  return refreshToken;
}