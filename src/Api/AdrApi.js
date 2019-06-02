import Api from './Api'

export const AdrApi = {
  addAdr: data => Api.post('/Adr', data),
  updateAdr: data => Api.put('/Adr', data),
  addDrug: data => Api.post('/ADRDrug', data),
  uploadAdrPhoto: (bodyFormData) => Api({
    url: '/AdrImage',
    method: 'POST',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
}
