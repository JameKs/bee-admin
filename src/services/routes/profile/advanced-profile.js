import { HttpClient } from 'utils';

export async function getAdvancedProfile(approvalNo) {
  return HttpClient.get(`/api/advancedProfile/${approvalNo}`);
}

export async function putApproval(body) {
  return HttpClient.put(`/api/approval/${body.approvalNo}`, body);
}
