import Api from './Api'

export const CaseApi = {
  addNewCase: data => Api.post('/Case', data),
  updateCase: data => Api.put('/Case', data),
  getSymptoms: () => Api.get('/Symptom'),
  uploadCasePhoto: (bodyFormData) => Api({
    url: '/CaseImage',
    method: 'POST',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
}
