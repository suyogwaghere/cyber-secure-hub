import styled from 'styled-components';

import { Box } from '@mui/material';
import { StyledCard } from 'components/Form/Card';
import Heading from 'components/Form/Heading';
import { ReactNode } from 'react';
import { useRouter } from 'routes/hook';
import colors from 'styles/colors';

const Header = styled(StyledCard)`
  margin: 1rem 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  align-items: center;
  width: 100%;
`;

const Nav = (props: { children?: ReactNode }) => {
  const router = useRouter();
  return (
    <Header as='header'>
      <Heading color={colors.primary} size='large' align='center'>
        <img
          width='128'
          src='/cyber-secure-hub.png'
          alt='Cyber Secure Hub Icon'
          style={{
            width: '128px',
            height: '128px',
            marginRight: '0.5rem',
          }}
        />
        <Box
          onClick={() => {
            router.push('/');
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          Cyber Secure Hub
        </Box>
      </Heading>
      {props.children && props.children}
    </Header>
  );
};

export default Nav;
