import axios from 'axios';
import { getToken } from 'service/auth';

const { REACT_APP_BASE_URL: baseURL } = process.env;

const configuredInstance = axios.create({
  baseURL,
});

const token = getToken();
if (token) {
  configuredInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;
}

export default configuredInstance;
