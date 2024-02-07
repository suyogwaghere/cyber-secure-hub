import styled from "styled-components";

import { StyledCard } from "components/Form/Card";
import Heading from "components/Form/Heading";
import { ReactNode } from "react";
import colors from "styles/colors";

const Header = styled(StyledCard)`
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  align-items: center;
  width: 95vw;
`;

const Nav = (props: { children?: ReactNode }) => {
  return (
    <Header as="header">
      <Heading color={colors.primary} size="large">
        <img
          width="128"
          src="/cyber-secure-hub.png"
          alt="Cyber Secure Hub Icon"
          style={{
            width: "128px",
            height: "128px",
            marginRight: "0.5rem",
          }}
        />
        <a href="/">Cyber Secure Hub</a>
      </Heading>
      {props.children && props.children}
    </Header>
  );
};

export default Nav;
