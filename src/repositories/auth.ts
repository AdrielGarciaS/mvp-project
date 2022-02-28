import { api } from 'services/api';

export const getUsers = async () => {
  const response = await api.get<{ data: User[] }>('users');

  return response.data;
};
