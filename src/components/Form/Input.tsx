import { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import colors from "styles/colors";
import { InputSize, applySize } from "styles/dimensions";

type Orientation = "horizontal" | "vertical";

interface Props {
  id: string;
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
  orientation?: Orientation;
  password?: boolean;
  email?: boolean;
  handleChange: (nweVal: React.ChangeEvent<HTMLInputElement>) => void;
}
type SupportedElements = HTMLInputElement | HTMLLabelElement | HTMLDivElement;
interface StyledInputTypes extends InputHTMLAttributes<SupportedElements> {
  inputSize?: InputSize;
  orientation?: Orientation;
  isValidPassword?: boolean;
  isValidEmail?: boolean;
  password?: boolean;
  email?: boolean;
}

const InputContainer = styled.div<StyledInputTypes>`
  display: flex;
  ${(props) =>
    props.orientation === "vertical" ? "flex-direction: column;" : ""};
`;

const StyledInput = styled.input<StyledInputTypes>`
  background: ${colors.background};
  color: ${colors.textColor};
  border-radius: 0.25rem;
  font-family: PTMono;
  box-shadow: 3px 3px 0px ${colors.backgroundDarker};
  &:focus {
    outline: 1px solid ${colors.primary};
  }

  ${(props) => applySize(props.inputSize)};

  ${(props) =>
    !props.isValidEmail && props.email
      ? css`
          border: 2px solid ${colors.danger};

          &:focus {
            outline: 4px solid ${colors.danger};
          }
        `
      : props.isValidEmail &&
        css`
          border: 2px solid ${colors.primary};
          &:focus {
            outline: 4px solid ${colors.primary};
          }
        `}

  ${(props) =>
    !props.isValidPassword && props.password
      ? css`
          border: 2px solid ${colors.danger};

          &:focus {
            outline: 4px solid ${colors.danger};
          }
        `
      : props.isValidPassword &&
        css`
          border: 2px solid ${colors.primary};
          &:focus {
            outline: 4px solid ${colors.primary};
          }
        `}
`;

const StyledLabel = styled.label<StyledInputTypes>`
  color: ${colors.textColor};
  ${(props) => applySize(props.inputSize)};
  padding: 0;
  font-size: 1.6rem;
`;

const isEmailValid = (email: string): boolean => {
  // Regular expression for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const isPasswordValid = (password: string): boolean => {
  // Password validation logic (e.g., minimum length)
  return password.length >= 8;
};

const Input = (inputProps: Props): JSX.Element => {
  const {
    id,
    value,
    label,
    placeholder,
    disabled,
    size,
    orientation,
    password,
    email,
    handleChange,
  } = inputProps;
  let isValidEmail1 = true; // Changed variable name from isValidPassword1 to isValidEmail1
  let isValidPassword1 = true;

  if (email) {
    isValidEmail1 = isEmailValid(value); // Corrected assignment to isValidEmail1
  }

  if (password) {
    // Corrected condition to always check password validation if password prop is true
    isValidPassword1 = isPasswordValid(value);
  }

  return (
    <>
      {!password && (
        <InputContainer orientation={orientation}>
          {label && (
            <StyledLabel htmlFor={id} inputSize={size}>
              {label}
            </StyledLabel>
          )}
          <StyledInput
            id={id}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            inputSize={size}
            isValidEmail={isValidEmail1}
            email={email}
            autoComplete="off"
          />
        </InputContainer>
      )}
      {password && (
        <InputContainer orientation={orientation}>
          <StyledInput
            id={id}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            inputSize={size}
            isValidPassword={isValidPassword1}
            password={password}
            type="password"
            autoComplete="off"
          />
        </InputContainer>
      )}
    </>
  );
};

export default Input;
