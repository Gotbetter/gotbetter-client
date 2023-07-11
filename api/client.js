import axios from 'axios';

import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

export const client = axios.create({
  baseURL: apiUrl,
  timeout: 2000,
});
