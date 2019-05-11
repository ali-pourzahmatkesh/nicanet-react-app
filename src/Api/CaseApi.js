import Api from './Api'

export const CaseApi = {
  addNewCase: data => Api.post('/Case', data),
  updateCase: data => Api.put('/Case', data),
  getSymptoms: () => Api.get('/Symptom'),
  searchDrugs: (text) => Api.get(`/Drug?drugName=${text}`),
  getDiseases: () => Api.get('/Disease'),
  getExaminationTypes: () => Api.get('/ExaminationType'),
  uploadCasePhoto: (bodyFormData) => Api({
    url: '/CaseImage',
    method: 'POST',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
}
