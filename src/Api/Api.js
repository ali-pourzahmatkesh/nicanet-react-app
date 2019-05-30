import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://api.pointina.ir/api'
});

export const ChatApi = axios.create({
  baseURL: 'http://app.pointina.ir:8080'
});

export const initToken = async () => {
  const token = localStorage.getItem('api_token');
  console.log('in init token', token);
  if (token) {
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    ChatApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const setToken = async (token, setInLocalStorage = true) => {
  setInLocalStorage && localStorage.setItem('api_token', token);
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  ChatApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  localStorage.removeItem('api_token');
  Api.defaults.headers.common.token = null;
  ChatApi.defaults.headers.common.token = null;
};

initToken();

export default Api;
