import axios from 'axios';
import dayjs from 'dayjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { apiResponseHandler } from '../utils/errorHandler';
import { useAuthTokens } from './useAuthTokens';
import { API_BASE_URL } from '@env';

type Configs = {
  baseUrl?: string
}

const defaultConfigs: Configs = {
  baseUrl: API_BASE_URL
}

const useApi = (configs?: Configs) => {
  const { baseUrl } = { ...defaultConfigs, ...configs };
  const { accessToken, refreshToken, setAuthTokens } = useAuthTokens()

  const http = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": "driver-app"
    },
  });

  http.interceptors.request.use(async req => {
    console.log(req.baseURL, req.url);
    let isTokenExpired = false;
    if (accessToken) {
      const decodedToken = jwtDecode<JwtPayload>(accessToken);
      isTokenExpired = dayjs.unix(decodedToken.exp as number).diff(dayjs()) < 1;
    }

    const skippable = ['/auth/login'].includes(req.url as string);
    if (!isTokenExpired || skippable) {

    console.log("herererer");

      return req;
    }


    try {
      const { data } = await axios.post(`${baseUrl}/auth/refresh`, { refreshToken });
      setAuthTokens(data.data);
      req.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("ERROR: ", error);
    }

    return req;
  });

  

  // global api response error handler
  http.interceptors.response.use(response => response, apiResponseHandler);

  return http;
};

export default useApi;
