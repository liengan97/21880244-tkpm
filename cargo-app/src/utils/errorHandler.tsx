import axios, { AxiosResponse } from 'axios';

export const apiResponseHandler = (error: any) => {
  if (error === null || !axios.isAxiosError(error)) {
    throw new Error("Unrecoverable error");
  }

  const { status, data } = error.response as AxiosResponse;

  switch (status) {
    case 400:
      console.error(data.error.message);
      break;
    case 401:
      console.error("You are not login!");
      break;
    case 403:
      console.error("Your account does not have enough permissions");
      break;
    default:
      console.error("Something went wrong!");
  }

  return Promise.reject(error);
}
