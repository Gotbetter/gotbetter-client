import { client } from './client';

export const checkAuthIdDuplicate = (auth_id) => client.post('users/verify', { auth_id });

export const signupRequest = (credentials) => client.post('users', credentials);

export const loginRequest = (credentials) => client.post('users/login', credentials);

export const refresh = () => client.post(`/users/reissue`, {});
