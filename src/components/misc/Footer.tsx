import styled from 'styled-components';
import colors from 'styles/colors';

const StyledFooter = styled.footer`
  bottom: 0;
  z-index: 99;
  text-align: center;
  padding: 0.5rem 0;
  border-radius: 8px;
  font-size: 1.2rem;
  background: ${colors.backgroundDarker};
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  opacity: 0.75;
  transition: all 0.2s ease-in-out;
  justify-content: center;
  @media (min-width: 1824px) {
    justify-content: center;
  }
  &:hover {
    opacity: 1;
  }
  span {
    margin: 0 0.5rem;
    text-align: center;
  }
`;

// const Link = styled.a`
//   color: ${colors.primary};
//   font-weight: bold;
//   border-radius: 4px;
//   padding: 0.1rem;
//   transition: all 0.2s ease-in-out;
//   &:hover {
//     background: ${colors.primary};
//     color: ${colors.backgroundDarker};
//     text-decoration: none;
//   }
// `;

const Footer = (props: { isFixed?: boolean }): JSX.Element => {
  return (
    <StyledFooter
      style={
        props.isFixed
          ? {
              position: 'fixed',
              marginBottom: 10,
              // width: 'calc(100% - 1.5rem)',
            }
          : {}
      }
    >
      <span>
        🌟 Your all-in-one tool for website intelligence and security
        exploration.
      </span>
      {/* <span>Don't forget to log out when you're done exploring!</span> */}
    </StyledFooter>
  );
};

export default Footer;
