import { HttpClient } from 'utils';

export async function getCity() {
  return HttpClient.get('/api/city');
}

export async function addThreeColumns(body) {
  return HttpClient.post('/api/threeColumns', body);
}
