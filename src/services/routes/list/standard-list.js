import { HttpClient } from 'utils';

export async function getHeader() {
  return HttpClient.get('/api/basicListHeader');
}

export async function getListData(body) {
  return HttpClient.get('/api/basicList', body);
}
