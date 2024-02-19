import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "components/Form/Button";
import Heading from "components/Form/Heading";
import Input from "components/Form/Input";

import { Box, Link, Typography } from "@mui/material";
import { useAuthContext } from "auth/hooks";
import Navbar from "components/Navbar";
import colors from "styles/colors";
import { determineAddressType } from "utils/address-type-checker";

const HomeContainer = styled.section`
  display: flex;
  margin-top: 1rem;
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
  margin-top: 5rem !important;
  border-radius: 8px;
  padding: 1rem;
  z-index: 5;
  margin: 1rem;
  width: calc(100% - 5rem);
  max-width: 40rem;
  z-index: 2;
`;

const ErrorMessage = styled.p`
  color: ${colors.danger};
  margin: 0.5rem;
`;

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [userData, setUserData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [errorMsg, setErrMsg] = useState("");
  const [inputDisabled] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

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
  const submit = async () => {
    // Call the function and set the error message
    setErrMsg(validateUserData(userData));
    try {
      await login(userData.userEmail, userData.userPassword);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setErrMsg("Invalid email or password");
    }
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

  const formSubmitEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setErrMsg(validateUserData(userData));
    // try {
    //   await login(userData.userEmail, userData.userPassword);
    //   navigate("/home");
    // } catch (error) {
    //   console.error(error);
    //   setErrMsg("Invalid email or password");
    // }
  };

  return (
    <HomeContainer>
      <Navbar />
      <UserInputMain onSubmit={formSubmitEvent}>
        <Heading as="h1" size="xLarge" align="center" color={colors.primary}>
          Login
        </Heading>
        <Typography
          variant="h6"
          sx={{
            marginTop: "2rem",
            marginLeft: "1rem",
            color: colors.primary,
            alignSelf: "center",
          }}
        >
          Welcome back! Please sign in to continue.
        </Typography>
        <Box sx={{}}>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "calc(100% - 2rem)",
            margin: "1rem",
          }}
        >
          <Button styles="width:50%" size="medium" onClick={submit}>
            Login
          </Button>
          <Typography
            variant="body1"
            sx={{
              marginTop: "1rem",
              color: colors.primary,
            }}
          >
            New user?{" "}
            <Link
              component="button"
              variant="body1"
              onClick={() => {
                console.info("I'm a button.");
                navigate("/auth/jwt/register");
              }}
            >
              Create an account
            </Link>
          </Typography>
        </Box>
      </UserInputMain>
    </HomeContainer>
  );
};

export default Login;
