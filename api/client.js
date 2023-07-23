import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import format from 'pretty-format';

import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

export const client = axios.create({
  baseURL: apiUrl,
  timeout: 2000,
});

client.interceptors.request.use(async (config) => {
  console.log('interceptor request');
  if (!config.headers) {
    return config;
  }

  if (config.url === '/users/login' || (config.url === '/users' && config.method === 'POST')) {
    return config;
  }

  let token = null;
  if (config.url === '/users/reissue') {
    console.log('interceptor reissue');
    token = await AsyncStorage.getItem('refresh_token');
  } else {
    console.log('interceptor access_token');
    token = await AsyncStorage.getItem('access_token');
  }

  console.log(`interceptor: ${token}`);
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    /** 1 */
    if (config.url === `/users/reissue` || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    /** 2 */
    config.sent = true;

    const refresh_token = await AsyncStorage.getItem('refresh_token');

    try {
      const accessToken = await refreshToken(refresh_token);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return client(config);
    } catch (err) {
      console.log(format(err.response));
    }
  },
);
const refreshToken = async (refreshToken) => {
  console.log('refresh' + refreshToken);

  const {
    data: { access_token, refresh_token },
  } = await client
    .post(
      `/users/reissue`,
      {},
      {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    )
    .catch((err) => {
      console.log(err);
    });

  await AsyncStorage.setItem('access_token', access_token);
  await AsyncStorage.setItem('refresh_token', refresh_token);

  return access_token;
};
