import Api from './Api'

export const AdrApi = {
  addAdr: data => Api.post('/Adr', data),
  updateAdr: data => Api.put('/Adr', data),
}
