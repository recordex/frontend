import { API_ENDPOINT } from '@/app/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const fetchApi = <RequestType, ResponseType>(
  token: string,
  method: 'GET' | 'POST' | 'PATCH',
  path: string,
  body?: RequestType,
) => {
  // body が FormData の場合は multipart/form-data に、それ以外は application/json にする
  const contentType =
    body instanceof FormData ? 'multipart/form-data' : 'application/json';
  const url = `${API_ENDPOINT}${path}`;
  const options: AxiosRequestConfig<RequestType> = {
    url,
    method,
    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${token}`,
    },
    data: body,
  };
  return axios.request<
    ResponseType,
    AxiosResponse<ResponseType, RequestType>,
    RequestType
  >(options);
};

export default fetchApi;
