import styled from 'styled-components';

import { Box } from '@mui/material';
import { StyledCard } from 'components/Form/Card';
import Heading from 'components/Form/Heading';
import Nav from 'components/Form/Nav';
import Navbar from 'components/Navbar';
import AdditionalResources from 'components/misc/AdditionalResources';
import Footer from 'components/misc/Footer';
import colors from 'styles/colors';
import docs, { about, featureIntro } from 'utils/docs';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  header {
    margin: 1rem 0;
    width: auto;
  }
  section {
    width: auto;
    .inner-heading {
      display: none;
    }
  }
`;

const HeaderLinkContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`;

const Section = styled(StyledCard)`
  margin-bottom: 2rem;
  overflow: clip;
  max-height: 100%;
  .about-section {
    color: ${colors.textColor};
  }
  .features-section {
    color: ${colors.textColor} !important;
  }
  h4 {
    color: ${colors.textColor} !important;
  }
  p {
    color: ${colors.textColor} !important;
  }
  section {
    clear: both;
  }
  h3 {
    font-size: 1.5rem;
  }
  hr {
    border: none;
    border-top: 1px dashed ${colors.primary};
    margin: 1.5rem auto;
  }
  ul {
    color: ${colors.textColor};
    padding: 0 0 0 1rem;
    list-style: circle;
  }
  a {
    color: ${colors.primary};
    &:visited {
      opacity: 0.8;
    }
  }
  pre {
    background: ${colors.background};
    border-radius: 4px;
    padding: 0.5rem;
    width: fit-content;
  }
  small {
    opacity: 0.7;
  }
  .contents {
    ul {
      list-style: none;
      li {
        a {
          color: ${colors.textColor};
          &:visited {
            opacity: 0.8;
          }
        }
        b {
          opacity: 0.75;
          display: inline-block;
          width: 1.5rem;
        }
      }
    }
  }
  .example-screenshot {
    float: right;
    display: inline-flex;
    flex-direction: column;
    clear: both;
    max-width: 300px;
    img {
      float: right;
      break-inside: avoid;
      max-width: 300px;
      max-height: 30rem;
      border-radius: 6px;
      clear: both;
    }
    figcaption {
      font-size: 0.8rem;
      text-align: center;
      opacity: 0.7;
    }
  }
`;

const makeAnchor = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, '-');
};

const About = (): JSX.Element => {
  return (
    <div>
      <AboutContainer>
        <Navbar />
        {/* <Footer isFixed /> */}
        <Nav>
          <HeaderLinkContainer>
            {/* <a href="https://github.com/suyogwaghere/cyber-secure-hub">
              <Button>View on GitHub</Button>
            </a> */}
          </HeaderLinkContainer>
        </Nav>

        <Heading as='h2' size='medium' color={colors.primary}>
          Intro
        </Heading>
        <Section>
          {about.map((para, index: number) => (
            <p className='about-section' key={index}>
              {para}
            </p>
          ))}
          <hr />
        </Section>

        <Heading as='h2' size='medium' color={colors.primary}>
          Features
        </Heading>
        <Section className='features-section'>
          {featureIntro.map((fi: string, i: number) => (
            <p key={i}>{fi}</p>
          ))}
          <div className='contents'>
            <Heading
              as='h3'
              size='small'
              id='#feature-contents'
              color={colors.primary}
            >
              Contents
            </Heading>
            <ul>
              {docs.map((section, index: number) => (
                <li>
                  <b>{index + 1}</b>
                  <a href={`#${makeAnchor(section.title)}`}>{section.title}</a>
                </li>
              ))}
            </ul>
            <hr />
          </div>
          {docs.map((section, sectionIndex: number) => (
            <section key={section.title}>
              {sectionIndex > 0 && <hr />}
              <Heading
                as='h3'
                size='small'
                id={makeAnchor(section.title)}
                color={colors.primary}
              >
                {section.title}
              </Heading>
              {section.screenshot && (
                <figure className='example-screenshot'>
                  <img
                    className='screenshot'
                    src={section.screenshot}
                    alt={`Example Screenshot ${section.title}`}
                  />
                  <figcaption>
                    Fig.{sectionIndex + 1} - Example of {section.title}
                  </figcaption>
                </figure>
              )}
              {section.description && (
                <>
                  <Heading as='h4' size='small'>
                    Description
                  </Heading>
                  <p>{section.description}</p>
                </>
              )}
              {section.use && (
                <>
                  <Heading as='h4' size='small'>
                    Use Cases
                  </Heading>
                  <p>{section.use}</p>
                </>
              )}
              {section.resources && section.resources.length > 0 && (
                <>
                  <Heading as='h4' size='small'>
                    Useful Links
                  </Heading>
                  <ul>
                    {section.resources.map(
                      (
                        link: string | { title: string; link: string },
                        linkIndx: number
                      ) =>
                        typeof link === 'string' ? (
                          <li id={`link-${linkIndx}`}>
                            <a target='_blank' rel='noreferrer' href={link}>
                              {link}
                            </a>
                          </li>
                        ) : (
                          <li id={`link-${linkIndx}`}>
                            <a
                              target='_blank'
                              rel='noreferrer'
                              href={link.link}
                            >
                              {link.title}
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                </>
              )}
            </section>
          ))}
        </Section>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem',
          }}
        >
          <Heading as='h2' size='medium' color={colors.primary}>
            Additional Resources
          </Heading>
        </Box>
        <AdditionalResources />
        <Footer />
      </AboutContainer>
    </div>
  );
};

export default About;
