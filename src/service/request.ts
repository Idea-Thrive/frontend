import axios from 'axios';

const { REACT_APP_BASE_URL: baseURL } = process.env;

const configuredInstance = axios.create({
  baseURL,
});

export default configuredInstance;
