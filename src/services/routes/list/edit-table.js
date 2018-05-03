import { HttpClient } from 'utils';

export async function getTableData(params) {
  return HttpClient.get('/api/editTable', params);
}

export async function getTableDataOne(id) {
  return HttpClient.get(`/api/editTable/${id}`);
}

export async function addOne(body) {
  return HttpClient.post('/api/editTable', body);
}

export async function editOne(body) {
  return HttpClient.put(`/api/editTable/${body.id}`, body);
}

export async function delOne(id) {
  return HttpClient.del(`/api/editTable/${id}`);
}
