import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from 'components/Form/Button';
import Heading from 'components/Form/Heading';
import Input from 'components/Form/Input';

import { Box, Link, Typography } from '@mui/material';
import { useAuthContext } from 'auth/hooks';
import Navbar from 'components/Navbar';
import { paths } from 'routes/paths';
import colors from 'styles/colors';
import { determineAddressType } from 'utils/address-type-checker';

const HomeContainer = styled.section`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'PTMono';
  padding: 0 1rem;
  footer {
    z-index: 1;
  }
`;

const UserInputMain = styled.form`
  background: ${colors.backgroundLighter};
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
  margin-top: 1.5rem !important;
  border-radius: 8px;
  padding: 1rem;
  z-index: 5;
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: 50rem;
  z-index: 2;
`;

const ErrorMessage = styled.p`
  color: ${colors.danger};
  margin: 0.5rem;
`;
const Register = (): JSX.Element => {
  const [userData, setUserData] = useState({
    userName: '',
    userMobile: '',
    userEmail: '',
    userPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState<string>(''); // Specify the type of errorMsg as string
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const isEmailValid = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateUserData = (): string => {
    const { userName, userEmail, userPassword } = userData;

    if (!userName) {
      return 'Name is required';
    } else if (!userEmail && !userPassword) {
      return 'Email and Password are required';
    } else if (!userEmail) {
      return 'Email is required';
    } else if (!userPassword) {
      return 'Password is required';
    } else if (!isEmailValid(userEmail) && !isPasswordValid(userPassword)) {
      return 'Invalid Email and Password';
    } else if (!isEmailValid(userEmail)) {
      return 'Invalid Email';
    } else if (!isPasswordValid(userPassword)) {
      return 'Invalid Password';
    } else {
      return ''; // Return empty string if all fields are valid
    }
  };

  const submit = async () => {
    try {
      const error = validateUserData();
      setErrorMsg(error);
      await register(
        userData.userEmail,
        userData.userPassword,
        userData.userName,
        userData.userMobile
      );
      navigate(paths.auth.jwt.login);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error);
    }
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    const isError = ['err', 'empt'].includes(determineAddressType(value));
    if (!isError) setErrorMsg('');
  };

  const formSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <HomeContainer>
      <Navbar />
      <UserInputMain onSubmit={formSubmitEvent}>
        <Heading as='h1' size='xLarge' align='center' color={colors.primary}>
          Register
        </Heading>
        <Typography
          variant='h6'
          sx={{
            marginTop: '2rem',
            marginLeft: '1rem',
            color: colors.primary,
            alignSelf: 'center',
          }}
        >
          Get started absolutely free.
        </Typography>
        <Box
          sx={{
            marginTop: '1rem',
          }}
        >
          <Input
            id='userEmail'
            value={userData.userEmail}
            size='large'
            orientation='vertical'
            placeholder='Enter email'
            handleChange={inputChange}
          />
          <Input
            id='userName'
            value={userData.userName}
            size='large'
            email={false}
            orientation='vertical'
            placeholder='Enter Name'
            handleChange={inputChange}
          />
          <Input
            id='userMobile'
            value={userData.userMobile}
            size='large'
            orientation='vertical'
            placeholder='Enter Mobile'
            handleChange={inputChange}
          />
          <Input
            id='userPassword'
            value={userData.userPassword}
            password
            email={false}
            size='large'
            orientation='vertical'
            placeholder='Enter password'
            handleChange={inputChange}
          />
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Box>
        <Box
          sx={{
            width: 'calc(100% - 2rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1rem',
          }}
        >
          <Button
            styles='width: "calc(100% - 1rem)"'
            size='large'
            onClick={submit}
          >
            Create Account
          </Button>
          <Typography
            variant='body1'
            sx={{
              marginTop: '1rem',
              color: colors.primary,
            }}
          >
            Already have an account?{' '}
            <Link
              component='button'
              variant='body1'
              onClick={() => {
                navigate(paths.auth.jwt.login);
              }}
              sx={{
                verticalAlign: 'unset',
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </UserInputMain>
    </HomeContainer>
  );
};

export default Register;
