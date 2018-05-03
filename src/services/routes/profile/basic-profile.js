import { HttpClient } from 'utils';

export async function getBasicProfile(userid) {
  return HttpClient.get(`/api/basicProfile/${userid}`);
}
