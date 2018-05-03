import { HttpClient } from 'utils';

export async function login(body) {
  return HttpClient.post('/api/tokens', body);
}
