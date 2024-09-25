import axiosInstance from './axios';
import {setHeader} from '@/utils/axiosInstance';
import {setEncryptStorage} from '@/utils/encryptedStorage';

const JWT_EXPIRRY_TIME = 1800 * 1000; //accessToken 만료시간-> 밀리초

const postPhoneAuth = async (phone: string): Promise<{message: string}> => {
  const {data} = await axiosInstance.post('/auth/message', {phone});
  return data;
};

type RequestUser = {
  phone: string;
  name: string;
  phoneAuthPassword: string;
  fcmTokenKey: string;
};
type ResponseUser = {
  id: number;
  name: string;
  phone: string;
  setPassword: boolean;
  linkAccount: boolean;
};

const setAccessToken = async (accessToken: string) => {
  try {
    await setEncryptStorage('accessToken', accessToken);
    // console.log('token', accessToken);
    setHeader('Authorization', accessToken);
  } catch (err) {
    console.log(err);
  }
  setTimeout(getAccessToken, JWT_EXPIRRY_TIME - 60000);
};
const postSignup = async ({
  phone,
  name,
  phoneAuthPassword,
  fcmTokenKey,
}: RequestUser): Promise<ResponseUser> => {
  const {data, headers} = await axiosInstance.post('/auth/in', {
    phone,
    name,
    phoneAuthPassword,
    fcmTokenKey,
  });
  const accessToken = headers.authorization;
  // console.log(accessToken);
  if (accessToken) {
    setAccessToken(accessToken);
  }
  return data;
};

type RequestPassword = {
  userId: number;
  password: string;
};

const patchPassword = async ({
  userId,
  password,
}: RequestPassword): Promise<void> => {
  const {data, headers} = await axiosInstance.patch('/auth/password', {
    userId,
    password,
  });
  const accessToken = headers.authorization;
  // console.log(accessToken);
  if (accessToken) {
    setAccessToken(accessToken);
  }
  return data;
};

const getAccessToken = async (): Promise<void> => {
  const {headers} = await axiosInstance.get('/auth/reissue');
  const accessToken = headers.authorization;
  // console.log(accessToken);
  if (accessToken) {
    setAccessToken(accessToken);
  }
};

type RequestLogin = {
  phone: string;
  password: string;
};
const postLogin = async ({phone, password}: RequestLogin): Promise<void> => {
  const formData = new FormData();
  formData.append('phone', phone);
  formData.append('password', password);
  const {headers} = await axiosInstance.post('/auth/login', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  const accessToken = headers.authorization;
  if (accessToken) {
    setAccessToken(accessToken);
  }
};

export {postPhoneAuth, postSignup, patchPassword, getAccessToken, postLogin};
