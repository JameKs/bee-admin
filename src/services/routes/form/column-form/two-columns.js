import { HttpClient } from 'utils';

export async function getCity() {
  return HttpClient.get('/api/city');
}

export async function addTwoColumns(body) {
  return HttpClient.post('/api/twoColumns', body);
}
