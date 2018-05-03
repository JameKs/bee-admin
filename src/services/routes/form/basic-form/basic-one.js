import { HttpClient } from 'utils';

export async function getCity() {
  return HttpClient.get('/api/city');
}

export async function addBasicOne(body) {
  return HttpClient.post('/api/basicOnes', body);
}
