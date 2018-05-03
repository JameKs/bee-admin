import { HttpClient } from 'utils';

export async function getCity() {
  return HttpClient.get('/api/city');
}

export async function addStepForm(body) {
  return HttpClient.post('/api/stepForms', body);
}
