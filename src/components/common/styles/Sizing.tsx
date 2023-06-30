import styled from 'styled-components';

const size = {
  xs: `440px`,
  sm: `650px`,
  md: `890px`,
  lg: `1150px`,
  xl: `1700px`,
};

export const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  lg: `(max-width: ${size.lg})`,
  xl: `(max-width: ${size.xl})`,
};

export const Section = styled.section`
  margin-bottom: 5rem;
`;
