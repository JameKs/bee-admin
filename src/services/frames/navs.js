import { HttpClient } from 'utils';

export async function getNavs(userid) {
  return HttpClient.get(`/api/navs/${userid}`);
}
