import Api from './Api'

export const CaseApi = {
  addNewCase: data => Api.post('/Case', data),
}
