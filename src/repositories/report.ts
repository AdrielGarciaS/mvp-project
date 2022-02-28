import { api } from 'services/api';

export const getGateways = async () => {
  const response = await api.get<Gateway[]>('/gateways');

  return response.data;
};

export const getProjects = async () => {
  const response = await api.get<Project[]>('/projects');

  return response.data;
};

export const createReports = async (params: CreateReportsParams) => {
  const response = await api.post<Report[]>('/report', params);

  return response.data;
};
