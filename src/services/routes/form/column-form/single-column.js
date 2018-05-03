import { HttpClient } from 'utils';

export async function getCity() {
  return HttpClient.get('/api/city');
}

export async function addSingleColumn(body) {
  return HttpClient.post('/api/singleColumns', body);
}
