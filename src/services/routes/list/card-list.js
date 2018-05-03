import { HttpClient } from 'utils';

export async function getHeader() {
  return HttpClient.get('/api/cardListHeader');
}

export async function getListData(body) {
  return HttpClient.get('/api/cardList', body);
}
