import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "components/Form/Button";
import Heading from "components/Form/Heading";
import Input from "components/Form/Input";

import colors from "styles/colors";
import { determineAddressType } from "utils/address-type-checker";

const HomeContainer = styled.section`
  display: flex;
  margin-top: 6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: "PTMono";
  padding: 0 1rem;
  footer {
    z-index: 1;
  }
`;

const UserInputMain = styled.form`
  background: ${colors.backgroundLighter};
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
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

const Login = (): JSX.Element => {
  const [userData, setUserData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [errorMsg, setErrMsg] = useState("");
  const [inputDisabled] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email: string): boolean => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password: string): boolean => {
    // Password validation logic (e.g., minimum length)
    return password.length >= 8;
  };

  const validateUserData = (userData: any) => {
    if (userData.userEmail === "" && userData.userPassword === "") {
      return "Email and Password are required";
    } else if (userData.userEmail === "") {
      return "Email is required";
    } else if (userData.userPassword === "") {
      return "Password is required";
    } else if (
      !isEmailValid(userData.userEmail) &&
      !isPasswordValid(userData.userPassword)
    ) {
      return "Invalid Email and Password";
    } else if (!isEmailValid(userData.userEmail)) {
      return "Invalid Email";
    } else if (!isPasswordValid(userData.userPassword)) {
      return "Invalid Password";
    } else {
      return ""; // Return empty string if both email and password are valid
    }
  };

  /* Check is valid address, either show err or redirect to results page */
  const submit = () => {
    // Call the function and set the error message
    setErrMsg(validateUserData(userData));

    navigate(`/login`);
    // }
  };

  /* Update user input state, and hide error message if field is valid */
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    const isError = ["err", "empt"].includes(
      determineAddressType(event.target.value)
    );
    if (!isError) setErrMsg("");
  };

  const formSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <HomeContainer>
      <UserInputMain onSubmit={formSubmitEvent}>
        <Heading as="h1" size="xLarge" align="center" color={colors.primary}>
          Sign in to User
        </Heading>
        <Input
          id="userEmail"
          value={userData.userEmail}
          email
          size="large"
          orientation="vertical"
          placeholder="Enter email"
          disabled={inputDisabled}
          handleChange={inputChange}
        />
        <Input
          id="userPassword"
          value={userData.userPassword}
          password
          email={false}
          size="large"
          orientation="vertical"
          placeholder="Enter password"
          disabled={inputDisabled}
          handleChange={inputChange}
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <Button
          styles="width: calc(100% - 1rem);"
          size="large"
          onClick={submit}
        >
          Login
        </Button>
      </UserInputMain>
    </HomeContainer>
  );
};

export default Login;
