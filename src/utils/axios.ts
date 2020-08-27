import axios, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosPromise,
} from 'axios';
import { getItem } from 'utils/localStorage';
import Qs from 'qs';
import { TYPE_LOCAL_STORAGE } from 'utils/constants';
import { store } from '../';
import { actions } from 'app/containers/App/slice';

const onSuccessInterceptorRequest = async config => {
  const token = await getItem(TYPE_LOCAL_STORAGE.TOKEN);
  if (token) config.headers['api-token'] = `${token}`;
  config.paramsSerializer = (params: any) =>
    Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    });
  return config;
};
const onErrorInterceptorRequest = (error: AxiosError) => Promise.reject(error);

const onErrorInterceptorResponse = (error: AxiosError) => {
  if (error.response && error.response.status) {
    if (error.response.status !== 200) {
      store.dispatch(
        actions.setOptionNotification({
          type: 'error',
          message: error.response?.data?.message || 'Lỗi',
        }),
      );
      store.dispatch(actions.changeIsOpenNotification(true));
      if (error.response.status === 401) {
        store.dispatch(actions.logout());
      }
    }
  }
  return Promise.reject(error);
};
const onSuccessInterceptorResponse = (response: AxiosResponse) => response;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const _axios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  timeout: 120 * 1000,
  // withCredentials: true, // Check cross-site Access-Control
});

_axios.interceptors.request.use(
  onSuccessInterceptorRequest,
  onErrorInterceptorRequest,
);

_axios.interceptors.response.use(
  onSuccessInterceptorResponse,
  onErrorInterceptorResponse,
);

/**
 * NOTE: axios instance (another token)
 * for that case join room with JWT
 */
export const _axiosNotAttachHeader: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_JWT || '',
  timeout: 120 * 1000,
});

_axiosNotAttachHeader.interceptors.request.use(function (config) {
  config.headers['api-token'] = config.data.jwt;
  config.paramsSerializer = (params: any) => {
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    });
  };
  return config;
}, onErrorInterceptorResponse);

_axiosNotAttachHeader.interceptors.response.use(
  onSuccessInterceptorResponse,
  onErrorInterceptorResponse,
);

/**
 *
 * @NOTE primary methods axios
 *
 */
export function $get(url: string, params?: object): AxiosPromise {
  return _axios.get(url, {
    params,
  });
}

export function $post(url: string, config?: object | string): AxiosPromise {
  return _axios.post(url, config);
}

export function $put(url: string, config?: object | string): AxiosPromise {
  return _axios.put(url, config);
}

export function $delete(url: string, config: object | string): AxiosPromise {
  return _axios.delete(url, { data: config });
}

export default _axios;
