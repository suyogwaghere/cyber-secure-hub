import styled from 'styled-components';

import Heading from 'components/Form/Heading';

import { Box, Grid } from '@mui/material';
import NavbarDemo from 'components/Navbar';
import Footer from 'components/misc/Footer';
import GenericProfileCard from 'components/misc/GenericProfileCard';
import { FaGithubSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import colors from 'styles/colors';

const profiles = [
  {
    imageUrl: '/assets/profiles/suyog.png',
    name: 'Suyog Waghere',
    description:
      'Experienced software engineer with a passion for building robust and scalable applications.',
    role: 'FullStack Developer',
    socialIcons: [
      <FaTwitterSquare size={50} key='twitter' />,
      <FaGithubSquare size={50} key='github' />,
      <FaLinkedin size={50} key='linkedin' />,
    ],
    socialLinks: [
      { twitter: 'https://twitter.com/suyogwaghere' },
      { github: 'https://github.com/suyogwaghere' },
      { linkedin: 'https://www.linkedin.com/in/suyogwaghere' },
    ],
  },
  {
    imageUrl: '/assets/profiles/harsh.png',
    name: 'Harsh Pardeshi',
    description:
      'A cyber guardian, wielding expertise to defend digital domains with precision and resilience.',
    role: 'Cybersecurity Enthusiast',
    socialIcons: [
      <FaTwitterSquare size={50} key='twitter' />,
      <FaGithubSquare size={50} key='github' />,
      <FaLinkedin size={50} key='linkedin' />,
    ],
    socialLinks: [
      { twitter: 'https://twitter.com/justblaz3i' },
      { github: 'https://github.com/hxrshexe' },
      { linkedin: 'https://www.linkedin.com/in/harsh-pardeshi-182669224' },
    ],
  },
  {
    imageUrl: '/assets/profiles/shrinad.png',
    name: 'Shrinad Patil',
    description:
      'Skilled DevOps engineer adept at optimizing infrastructure for efficient development and deployment.',
    role: 'DevOps Engineer',
    socialIcons: [
      <FaTwitterSquare size={50} key='twitter' />,
      <FaGithubSquare size={50} key='github' />,
      <FaLinkedin size={50} key='linkedin' />,
    ],
    socialLinks: [
      { twitter: 'https://x.com/patil_shrinad' },
      { github: 'https://github.com/Shrinad-99' },
      { linkedin: 'https://www.linkedin.com/in/shrinad-patil-3700ab232' },
    ],
  },
  {
    imageUrl: '/assets/profiles/krunal.png',
    name: 'Krunal Kurhe',
    description:
      'Passionate UI/UX designer with a keen eye for detail and a focus on user-centric design.',
    role: 'UI/UX Designer',
    socialIcons: [
      <FaTwitterSquare size={50} key='twitter' />,
      <FaGithubSquare size={50} key='github' />,
      <FaLinkedin size={50} key='linkedin' />,
    ],
    socialLinks: [
      { twitter: 'https://twitter.com/krunalkurhe' },
      { github: 'https://github.com/krunalk75' },
      { linkedin: 'https://www.linkedin.com/in/krunal-kurhe-a2aa84270' },
    ],
  },
];

const HomeContainer = styled.section`
  display: flex;
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

const Teams = (): JSX.Element => {
  return (
    <HomeContainer>
      <NavbarDemo />
      <Box py={4}>
        <Heading as='h1' size='xLarge' align='center' color={colors.primary}>
          Meet Our Team
        </Heading>
      </Box>
      <Grid
        py={2}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '20px',
        }}
      >
        {profiles.map((profile, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <GenericProfileCard {...profile} />
          </div>
        ))}
      </Grid>
      <Footer />
    </HomeContainer>
  );
};

export default Teams;
