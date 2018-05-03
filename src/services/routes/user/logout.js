import { HttpClient } from 'utils';

export async function logout(userid) {
  return HttpClient.del(`/api/tokens/${userid}`);
}
