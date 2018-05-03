import { HttpClient } from 'utils';

export async function getCity() {
  return HttpClient.get('/api/city');
}

export async function addBasicTwo(body) {
  return HttpClient.post('/api/basicTwos', body);
}
