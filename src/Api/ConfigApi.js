import Api from './Api'

export const ConfigApi = {
  getConfig: (configId) => Api.get(`/Config/${configId}`),
}
