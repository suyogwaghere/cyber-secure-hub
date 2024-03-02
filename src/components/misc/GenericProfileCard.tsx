import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

// Styled component for the wrapper
const SiteFeaturesWrapper = styled.div`
  background: ${colors.backgroundLighter};
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
  width: 267.75px;
  padding: 30px;
  border-radius: 15px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 47px;
  display: inline-flex;
`;

// Styled component for the profile image
const ProfileImage = styled.img`
  width: 197px;
  height: 197px;
  border-radius: 98.5px;
  border: 4px #9fef00 solid;
`;

// Styled component for the heading
const Heading = styled.div`
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: 400;
  word-wrap: break-word;
`;

// Styled component for the description
const Description = styled.div`
  align-self: stretch;
  height: 150px;
  padding: 0.79px 5.2px;
  flex-direction: column;
  text-align: center;
  align-items: center;
  display: flex;
`;

// Styled component for the role
const Role = styled.div`
  text-align: center;
  height: 35px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  word-wrap: break-word;
`;

// Styled component for the social icons wrapper
const SocialIconsWrapper = styled.div`
  height: 23px;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
`;

// Styled component for each social icon
const SocialIcon = styled.div<{ margin?: boolean }>`
  align-self: stretch;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  display: inline-flex;
  cursor: pointer;
  padding-left: ${(props) => (props.margin ? '0px' : '0')};
`;

interface Props {
  imageUrl: string;
  name: string;
  description: string;
  role: string;
  socialIcons: JSX.Element[];
  socialLinks: object[];
}

// Functional component for the generic profile card
const GenericProfileCard: React.FC<Props> = ({
  imageUrl,
  name,
  description,
  role,
  socialIcons,
  socialLinks,
}) => {
  const handleClick = (key: string) => {
    console.log(`You clicked on the ${key} icon`);

    // Find the corresponding social link based on the key
    const linkObject = socialLinks.find((link) => Object.keys(link)[0] === key);
    if (linkObject) {
      const link = Object.values(linkObject)[0];
      window.open(link, '_blank'); // Open link in a new tab
    } else {
      console.log(`No link found for ${key}`);
    }
  };
  return (
    <SiteFeaturesWrapper>
      <ProfileImage src={imageUrl} alt={name} />
      <Heading>{name}</Heading>
      <Description>{description}</Description>
      <Role>{role}</Role>
      <SocialIconsWrapper>
        {socialIcons.map((icon, index) => (
          <SocialIcon
            key={index}
            margin={index > 0}
            onClick={() => {
              if (icon.key) {
                handleClick(icon.key);
              }
            }}
          >
            {icon}
          </SocialIcon>
        ))}
      </SocialIconsWrapper>
    </SiteFeaturesWrapper>
  );
};

export default GenericProfileCard;
