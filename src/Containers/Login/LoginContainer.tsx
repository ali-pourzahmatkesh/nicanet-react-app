import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../Redux/Actions/Auth/AuthActions'
import {
  Container,
  LogoImage,
  GradientSectionContainer,
  TopSectionContainer,
  MiddleSectionContainer,
  MockupImage,
  FormContainer,
  FormTitle,
  LoginButton,
  // BottomSectionContainer,
  // AppBadgesContainer,
  RegisterLink,
  RegisterText
} from './styled'
import TextInput from '../../components/TextInput'
import {
  // SibAppBadge,
  // DirectLinkBadge,
  // GooglePlayBadge,
  // CafeBazaarBadge
} from '../../components/Badges'
import { AuthApi } from '../../Api/AuthApi'
import { RouteComponentProps, Redirect } from 'react-router';

import pointinaLogo from '../../Assets/logo.png'
import mockupImage from '../../Assets/mockup.png'
import { HOME_ROUTE } from 'router/RouterConstants';
import AuthLayout from 'components/Partials/Layout/AuthLayout';

interface LoginContainerProps {
  login: any
  isLoggedIn: boolean
}

class LoginContainer extends React.Component<LoginContainerProps & RouteComponentProps<{}>, any> {
  state = {
    register: false,
    phoneNumber: '',
    password: '',
    code: '',
    getUserInfo: false,
    personId: null,
    firstName: '',
    lastName: '',
    email: '',
    passwordRepeat: ''
  }

  handleLogin = async (event: any) => {
    event && event.preventDefault()

    const { phoneNumber, password } = this.state

    this.props.login({ username: phoneNumber, password })
  }

  handleGetCode = async () => {
    const { phoneNumber } = this.state

    try {
      const response = await AuthApi.register(phoneNumber)

      if (response.status !== 200) {
        throw response
      }

      this.setState({ personId: response.data })
    } catch (error) {
      console.log('error in requesting code', error)
      alert('Failed to request code, please try again')
    }
  }

  handleVerify = async () => {
    const { phoneNumber, code } = this.state

    try {
      const response = await AuthApi.verifyCode(phoneNumber, code)

      if (response.status !== 204) {
        throw response
      }

      this.setState({ getUserInfo: true })
    } catch (error) {
      console.log('error in requesting code', error)
      alert('Failed to request code, please try again')
    }
  }

  submitUserInfo = async () => {
    const {
      personId,
      firstName,
      lastName,
      email,
      password,
      passwordRepeat
    } = this.state

    if (passwordRepeat !== password) {
      return alert('Passwords do not match')
    }

    try {
      const response = await AuthApi.updateUser(
        personId,
        firstName,
        lastName,
        email,
        password
      )

      if (response.status !== 204) {
        throw response
      }

      login({ userId: personId })
    } catch (error) {
      console.log('error in updating user', error)
      alert('Failed to set info, please try again')
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={HOME_ROUTE} />
    }

    const { register, personId, getUserInfo } = this.state

    return (
      <AuthLayout>
        <Container>
          <GradientSectionContainer>
            <TopSectionContainer>
              <LogoImage src={pointinaLogo} />
            </TopSectionContainer>
            <MiddleSectionContainer>
              <MockupImage src={mockupImage} />
              {!register && !getUserInfo && (
                <FormContainer>
                  <FormTitle>Enter your phone number and password</FormTitle>
                  <TextInput
                    placeholder="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={e =>
                      this.setState({ phoneNumber: e.target.value })
                    }
                  />
                  <TextInput
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <LoginButton onClick={this.handleLogin}>Log In</LoginButton>
                  <RegisterText>
                    Don't have an account?{' '}
                    <RegisterLink
                      onClick={() => this.setState({ register: true })}
                    >
                      Register Now
                    </RegisterLink>
                  </RegisterText>
                </FormContainer>
              )}
              {register && !personId && !getUserInfo && (
                <FormContainer>
                  <FormTitle>Enter your phone number</FormTitle>
                  <TextInput
                    placeholder="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={e =>
                      this.setState({ phoneNumber: e.target.value })
                    }
                  />
                  <LoginButton onClick={this.handleGetCode}>
                    Get Verification Code
                  </LoginButton>
                  <RegisterText>
                    Have an account?{' '}
                    <RegisterLink
                      onClick={() => this.setState({ register: false })}
                    >
                      Login
                    </RegisterLink>
                  </RegisterText>
                </FormContainer>
              )}
              {register && personId && !getUserInfo && (
                <FormContainer>
                  <FormTitle>
                    A verification code has been sent to your phone number.
                    Enter the code
                  </FormTitle>
                  <TextInput
                    placeholder="Phone Number"
                    value={this.state.code}
                    onChange={e => this.setState({ code: e.target.value })}
                  />
                  <LoginButton onClick={this.handleVerify}>Verify</LoginButton>
                </FormContainer>
              )}
              {getUserInfo && (
                <FormContainer>
                  <FormTitle>Enter your information</FormTitle>
                  <TextInput
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={e => this.setState({ firstName: e.target.value })}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={e => this.setState({ lastName: e.target.value })}
                  />
                  <TextInput
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <TextInput
                    type="password"
                    placeholder="Passsword"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <TextInput
                    type="password"
                    placeholder="Confirm password"
                    value={this.state.passwordRepeat}
                    onChange={e =>
                      this.setState({ passwordRepeat: e.target.value })
                    }
                  />
                  <LoginButton onClick={this.submitUserInfo}>
                    Continue
                  </LoginButton>
                </FormContainer>
              )}
            </MiddleSectionContainer>
            {/* <BottomSectionContainer>
              <p>Get Pointina app now.</p>
              <AppBadgesContainer>
                <SibAppBadge />
                <DirectLinkBadge />
                <GooglePlayBadge />
                <CafeBazaarBadge />
              </AppBadgesContainer>
            </BottomSectionContainer> */}
          </GradientSectionContainer>
        </Container>
      </AuthLayout>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.user !== null  
})

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)