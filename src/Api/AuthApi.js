import Api from './Api'

export const AuthApi = {
  login: ({ username, password }) =>
    Api.post('/Token', {
      UserName: username,
      Password: password
    }),
  register: phoneNumber => Api.post('/Register', { mobile: phoneNumber }),
  verifyCode: (phoneNumber, code) =>
    Api.post('/VerifyCode', {
      Number: phoneNumber,
      Code: code
    }),
  updateUser: (firstName, lastName, email, password) =>
    Api.put('/Register', {
      firstName,
      lastName,
      email,
      PassKey: password
    })
}
