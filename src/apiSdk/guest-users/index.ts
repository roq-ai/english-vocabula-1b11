import axios from 'axios';
import queryString from 'query-string';
import { GuestUserInterface, GuestUserGetQueryInterface } from 'interfaces/guest-user';
import { GetQueryInterface } from '../../interfaces';

export const getGuestUsers = async (query?: GuestUserGetQueryInterface) => {
  const response = await axios.get(`/api/guest-users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGuestUser = async (guestUser: GuestUserInterface) => {
  const response = await axios.post('/api/guest-users', guestUser);
  return response.data;
};

export const updateGuestUserById = async (id: string, guestUser: GuestUserInterface) => {
  const response = await axios.put(`/api/guest-users/${id}`, guestUser);
  return response.data;
};

export const getGuestUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/guest-users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGuestUserById = async (id: string) => {
  const response = await axios.delete(`/api/guest-users/${id}`);
  return response.data;
};
