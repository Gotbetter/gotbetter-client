import { client } from './client';

export const checkAuthIdDuplicate = (auth_id) => client.post('users/verify', { auth_id });

export const signupRequest = (credentials) => client.post('users', credentials);
