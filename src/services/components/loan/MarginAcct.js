import { HttpClient } from 'utils';

export async function getMarginAcct(acct) {
  return HttpClient.get(`/api/margins/${acct}`);
}
