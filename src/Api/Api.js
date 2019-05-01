import axios from 'axios'

const Api = axios.create({
  baseURL: 'https://api.pointina.ir/api'
})

export const ChatApi = axios.create({
  baseURL: 'http://app.pointina.ir:8080'
})

export const getToken = async () => {
  const oldToken = localStorage.getItem('api_token')
  if (oldToken) {
    Api.defaults.headers.common.Authorization = `Bearer ${oldToken}`
    ChatApi.defaults.headers.common.Authorization = `Bearer ${oldToken}`
    return
  }
  const response = await Api.post('/Token', {
    username: 'NiccanetToken',
    password: 'NiccanetPharmedApp'
  })
  
  localStorage.setItem('api_token', response.data)

  if (response.status === 200) {
    Api.defaults.headers.common.Authorization = `Bearer ${response.data}`
    ChatApi.defaults.headers.common.Authorization = `Bearer ${response.data}`
  }
}

export const removeToken = () => {
  localStorage.removeItem('api_token')
  Api.defaults.headers.common.token = null
  ChatApi.defaults.headers.common.token = null
}

getToken()

export default Api
