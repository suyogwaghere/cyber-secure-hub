import styled from 'styled-components';

import Heading from 'components/Form/Heading';

import { Box, Grid } from '@mui/material';
import Navbar from 'components/Navbar';
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
    role: 'Creative Leader',
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
      'Skilled software engineer specializing in web development with expertise in React and Node.js.',
    role: 'Software Engineer',
    socialIcons: [
      <FaTwitterSquare size={50} key='twitter' />,
      <FaGithubSquare size={50} key='github' />,
      <FaLinkedin size={50} key='linkedin' />,
    ],
    socialLinks: [
      { twitter: 'https://twitter.com/harsh' },
      { github: 'https://github.com/harsh' },
      { linkedin: 'https://www.linkedin.com/' },
    ],
  },
  {
    imageUrl: '/assets/profiles/shrinad.png',
    name: 'Shrinad Patil',
    description:
      'Passionate UI/UX designer with a keen eye for detail and a focus on user-centric design.',
    role: 'UI/UX Designer',
    socialIcons: [
      <FaTwitterSquare size={50} key='twitter' />,
      <FaGithubSquare size={50} key='github' />,
      <FaLinkedin size={50} key='linkedin' />,
    ],
    socialLinks: [
      { twitter: 'https://twitter.com/' },
      { github: 'https://github.com/' },
      { linkedin: 'https://www.linkedin.com/' },
    ],
  },
  {
    imageUrl: '/assets/profiles/krunal.png',
    name: 'Krunal Kurhe',
    description:
      'Seasoned project manager with a track record of delivering successful projects on time and within budget.',
    role: 'Project Manager',
    socialIcons: [
      <FaTwitterSquare size={50} key='twitter' />,
      <FaGithubSquare size={50} key='github' />,
      <FaLinkedin size={50} key='linkedin' />,
    ],
    socialLinks: [
      { twitter: 'https://twitter.com/' },
      { github: 'https://github.com/' },
      { linkedin: 'https://www.linkedin.com/' },
    ],
  },
];

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

const Teams = (): JSX.Element => {
  return (
    <HomeContainer>
      <Navbar />
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
