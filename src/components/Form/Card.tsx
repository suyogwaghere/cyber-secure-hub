import styled from 'styled-components';

import Heading from 'components/Form/Heading';
import ErrorBoundary from 'components/misc/ErrorBoundary';
import { ReactNode } from 'react';
import colors from 'styles/colors';

export const StyledCard = styled.section<{ styles?: string }>`
  background: ${colors.backgroundLighter};
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  margin: 0.5rem;
  max-height: 66rem;
  overflow: auto;
  ${(props) => props.styles}
`;

interface CardProps {
  children: React.ReactNode;
  heading?: string;
  styles?: string;
  actionButtons?: ReactNode | undefined;
}

export const Card = (props: CardProps): JSX.Element => {
  const { children, heading, styles, actionButtons } = props;
  return (
    <ErrorBoundary title={heading}>
      <StyledCard styles={styles}>
        {actionButtons && actionButtons}
        {heading && (
          <Heading
            className='inner-heading'
            as='h3'
            align='left'
            color={colors.primary}
          >
            {heading}
          </Heading>
        )}
        {children}
      </StyledCard>
    </ErrorBoundary>
  );
};

export default StyledCard;
