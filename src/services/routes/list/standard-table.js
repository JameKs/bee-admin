import { HttpClient } from 'utils';

export async function getTableData(params) {
  return HttpClient.get('/api/standardTable', params);
}

export async function getTableDataOne(id) {
  return HttpClient.get(`/api/standardTable/${id}`);
}
