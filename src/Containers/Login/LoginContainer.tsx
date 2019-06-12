import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../Redux/Actions/Auth/AuthActions';
import { setToken } from '../../Api/Api';
import ContinueButton from './ContinueButton';
import {
  Container,
  LogoImage,
  GradientSectionContainer,
  TopSectionContainer,
  MiddleSectionContainer,
  MockupImage,
  FormContainer,
  FormTitle,
  RegisterLink,
  RegisterText,
  SiteTitle,
  SiteSlogan,
  MockupImageWrapper,
  FormWrapper,
  Text,
  ErrorMsg,
  TextInputWrapper,
  Timer,
  Resend
} from './styled';
import TextInput from '../../components/TextInput';
// import {
//   SibAppBadge,
//   DirectLinkBadge,
//   GooglePlayBadge,
//   CafeBazaarBadge
// } from '../../components/Badges';
import { AuthApi } from '../../Api/AuthApi';
import { RouteComponentProps, Redirect } from 'react-router';

import pointinaLogo from '../../Assets/logo.png';
import mockupImage from '../../Assets/macbookpro.png';
import { HOME_ROUTE } from 'router/RouterConstants';
import AuthLayout from 'components/Partials/Layout/AuthLayout';
import { englishNumber } from '../../utils/utils';
import { emailValidation, passwordValidation } from '../../utils/validation';

interface LoginContainerProps {
  login: any;
  isLoggedIn: boolean;
  isLoading: boolean;
}

class LoginContainer extends React.Component<
  LoginContainerProps & RouteComponentProps<{}>,
  any
> {
  state = {
    register: false,
    phoneNumber: '',
    password: '',
    code: '',
    getUserInfo: false,
    person: null,
    personId: null,
    token: '',
    firstName: '',
    lastName: '',
    email: '',
    passwordRepeat: '',
    timeRemaining: 120,
    phoneNumberError: '',
    formError: '',
    isLoading: false,
    showTimer: true,
    timer: '',
    errorFirstName: '',
    errorLastName: '',
    errorEmail: '',
    errorPassword: '',
    errorConfirmPass: ''
  };

  componentDidMount() {
    this.timerCountDown();
  }

  timerCountDown() {
    const countdown = setInterval(() => {
      if (this.state.timeRemaining > 0) {
        const remaning = this.state.timeRemaining - 1;
        this.setState({ timeRemaining: remaning });

        let minutes = 0;
        let seconds = 0;
        if (remaning > 60) {
          minutes = Math.floor(remaning / 60);
          seconds = Math.floor(remaning % 60);
        } else {
          seconds = remaning;
        }
        const minutesStr = minutes > 9 ? minutes : `0${minutes}`;
        const secondsStr = seconds > 9 ? seconds : `0${seconds}`;
        this.setState({ timer: `${minutesStr} : ${secondsStr}` });
      } else {
        this.setState({
          showTimer: false,
          code: '',
          formError: ''
        });

        if (countdown) {
          clearInterval(countdown);
        }
      }
    }, 1000);
  }

  handleLogin = async (event: any) => {
    event && event.preventDefault();
    const { phoneNumber, password } = this.state;
    this.setState({
      phoneNumberError: '',
      formError: ''
    });
    if (!phoneNumber) {
      this.setState({
        phoneNumberError: 'Phone number is required.'
      });
      return;
    } else if (phoneNumber.length !== 11) {
      this.setState({
        phoneNumberError: 'Incorrect phone number'
      });
      return;
    }

    this.setState({
      isLoading: true
    });

    await this.props.login({ username: phoneNumber, password });
    this.setState({
      isLoading: false
    });
    if (!this.props.isLoggedIn) {
      this.setState({
        formError: 'Username or password is incorrect'
      });
    }
  };

  handleGetCode = async (resendCode = false) => {
    const { phoneNumber } = this.state;

    this.setState({
      formError: ''
    });

    if (!phoneNumber) {
      this.setState({
        formError: 'Phone number is required.'
      });
      return;
    } else if (phoneNumber.length !== 11) {
      this.setState({
        formError: 'Incorrect phone number'
      });
      return;
    }

    this.setState({
      isLoading: true
    });

    try {
      const response = await AuthApi.register(phoneNumber);

      if (response.status !== 200) {
        throw response;
      }

      await setToken(response.data.Token, false);

      this.setState(
        {
          person: response.data.Person,
          personId: response.data.Person.PersonId,
          token: response.data.Token,
          isLoading: false,
          timeRemaining: 120,
          showTimer: true
        },
        () => {
          this.timerCountDown();
        }
      );
    } catch (error) {
      this.setState({
        isLoading: false,
        formError: resendCode
          ? "You can 't request more than three times a day!"
          : 'This phone number has been registered!'
      });
      console.log('error in requesting code', error);
      // alert('Failed to request code, please try again');
    }
  };

  handleVerify = async () => {
    const { phoneNumber, code } = this.state;
    this.setState({
      formError: ''
    });

    if (!code) {
      this.setState({
        formError: 'Code number is required.'
      });
      return;
    }

    this.setState({
      isLoading: true
    });

    try {
      const response = await AuthApi.verifyCode(phoneNumber, code);

      if (response.status !== 204) {
        throw response;
      }

      this.setState({ getUserInfo: true, isLoading: false });
    } catch (error) {
      this.setState({
        isLoading: false,
        formError: 'Verification code is not True!'
      });
      console.log('error in requesting code', error);
      // alert('Failed to request code, please try again');
    }
  };

  submitUserInfo = async () => {
    if (!this.isRegisterValid()) {
      return;
    }

    this.setState({
      isLoading: true
    });

    const { phoneNumber, firstName, lastName, email, password } = this.state;

    try {
      const response = await AuthApi.updateUser(
        firstName,
        lastName,
        email,
        password
      );

      if (response.status !== 204) {
        throw response;
      }
      await this.props.login({ username: phoneNumber, password });
      this.setState({
        isLoading: false
      });
    } catch (error) {
      console.log('error in updating user', error);
      this.setState({
        errorConfirmPass: 'The information has been full!',
        isLoading: false
      });
      // alert('Failed to set info, please try again');
    }
  };

  isRegisterValid = () => {
    let hasError = false;

    this.setState({
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirmPass: ''
    });

    const { firstName, lastName, email, password, passwordRepeat } = this.state;

    if (!firstName) {
      this.setState({ errorFirstName: 'First Name is required!' });
      hasError = true;
    }

    if (!lastName) {
      this.setState({ errorLastName: 'Last Name is required!' });
      hasError = true;
    }

    if (email && !emailValidation(email)) {
      this.setState({
        errorEmail: 'Email address.(e.g: pointina@example.com)'
      });
      hasError = true;
    }

    if (!passwordValidation(password)) {
      this.setState({ errorPassword: 'At least 6 characters.' });
      hasError = true;
    }

    if (password && password !== passwordRepeat) {
      this.setState({
        errorConfirmPass: "Password and confirm password don't match"
      });
      hasError = true;
    }

    if (!hasError) {
      return true;
    }

    return false;
  };

  resendActiveCodeToUser = () => {
    this.setState({
      isLoading: true,
      timer: '',
      code: '',
      formError: '',
      showTimer: false
    });
    this.handleGetCode(true);
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={HOME_ROUTE} />;
    }
    const { register, personId, getUserInfo } = this.state;

    return (
      <AuthLayout>
        <Container>
          <GradientSectionContainer>
            <TopSectionContainer>
              <LogoImage src={pointinaLogo} />
              <SiteTitle>Hightech Health Connections</SiteTitle>
              <SiteSlogan>
                This program is provided for members of the medical staff
                (including doctors, nurses, medical students, etc)
              </SiteSlogan>
            </TopSectionContainer>

            <MiddleSectionContainer>
              <MockupImageWrapper>
                <MockupImage src={mockupImage} />
              </MockupImageWrapper>

              {!register && !getUserInfo && (
                <FormWrapper>
                  <FormContainer>
                    <FormTitle>Enter your information for login</FormTitle>
                    <TextInputWrapper>
                      <TextInput
                        type="number"
                        placeholder="Phone Number"
                        value={this.state.phoneNumber}
                        onChange={e =>
                          this.setState({
                            phoneNumber: englishNumber(e.target.value),
                            phoneNumberError: '',
                            formError: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.phoneNumberError}</ErrorMsg>
                    </TextInputWrapper>
                    <TextInputWrapper>
                      <TextInput
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={e =>
                          this.setState({
                            password: e.target.value,
                            formError: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.formError}</ErrorMsg>
                    </TextInputWrapper>
                    <ContinueButton
                      onClick={this.handleLogin}
                      title="Log In"
                      isLoading={this.state.isLoading}
                    />
                    <RegisterText>
                      <Text>Don't have an account? </Text>
                      <RegisterLink
                        onClick={() =>
                          this.setState({
                            register: true,
                            phoneNumberError: ''
                          })
                        }
                      >
                        Register Now
                      </RegisterLink>
                    </RegisterText>
                  </FormContainer>
                </FormWrapper>
              )}
              {register && !personId && !getUserInfo && (
                <FormWrapper>
                  <FormContainer>
                    <FormTitle>Enter your phone number</FormTitle>
                    <TextInputWrapper>
                      <TextInput
                        placeholder="Phone Number"
                        value={this.state.phoneNumber}
                        onChange={e =>
                          this.setState({
                            phoneNumber: englishNumber(e.target.value),
                            formError: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.formError}</ErrorMsg>
                    </TextInputWrapper>
                    <ContinueButton
                      onClick={() => this.handleGetCode()}
                      title="Get Verification Code"
                      isLoading={this.state.isLoading}
                    />

                    <RegisterText>
                      Have an account?{' '}
                      <RegisterLink
                        onClick={() => this.setState({ register: false })}
                      >
                        Login
                      </RegisterLink>
                    </RegisterText>
                  </FormContainer>
                </FormWrapper>
              )}
              {register && personId && !getUserInfo && (
                <FormWrapper>
                  <FormContainer>
                    <FormTitle>
                      A verification code has been sent to your phone number.
                      <br /> Enter the code
                    </FormTitle>
                    <TextInputWrapper>
                      <TextInput
                        placeholder="Verification Code"
                        value={this.state.code}
                        onChange={e =>
                          this.setState({
                            formError: '',
                            code: englishNumber(e.target.value)
                          })
                        }
                      />
                      <ErrorMsg>{this.state.formError}</ErrorMsg>
                    </TextInputWrapper>
                    <Timer>{this.state.timer}</Timer>
                    <Resend
                      isActive={!this.state.showTimer}
                      onClick={() => {
                        !this.state.showTimer && this.resendActiveCodeToUser();
                      }}
                    >
                      Resend
                    </Resend>
                    <ContinueButton
                      onClick={this.handleVerify}
                      title="Verify"
                      isLoading={this.state.isLoading}
                    />
                  </FormContainer>
                </FormWrapper>
              )}
              {getUserInfo && (
                <FormWrapper>
                  <FormContainer>
                    <FormTitle>Enter your information</FormTitle>
                    <TextInputWrapper>
                      <TextInput
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={e =>
                          this.setState({
                            firstName: e.target.value,
                            errorFirstName: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.errorFirstName}</ErrorMsg>
                    </TextInputWrapper>
                    <TextInputWrapper>
                      <TextInput
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={e =>
                          this.setState({
                            lastName: e.target.value,
                            errorLastName: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.errorLastName}</ErrorMsg>
                    </TextInputWrapper>
                    <TextInputWrapper>
                      <TextInput
                        placeholder="Email"
                        value={this.state.email}
                        onChange={e =>
                          this.setState({
                            email: e.target.value,
                            errorEmail: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.errorEmail}</ErrorMsg>
                    </TextInputWrapper>
                    <TextInputWrapper>
                      <TextInput
                        type="password"
                        placeholder="Passsword"
                        value={this.state.password}
                        onChange={e =>
                          this.setState({
                            password: e.target.value,
                            errorPassword: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.errorPassword}</ErrorMsg>
                    </TextInputWrapper>
                    <TextInputWrapper>
                      <TextInput
                        type="password"
                        placeholder="Confirm password"
                        value={this.state.passwordRepeat}
                        onChange={e =>
                          this.setState({
                            passwordRepeat: e.target.value,
                            errorConfirmPass: ''
                          })
                        }
                      />
                      <ErrorMsg>{this.state.errorConfirmPass}</ErrorMsg>
                    </TextInputWrapper>
                    <ContinueButton
                      onClick={this.submitUserInfo}
                      title="Continue"
                      isLoading={this.state.isLoading}
                    />
                  </FormContainer>
                </FormWrapper>
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
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.user !== null
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
