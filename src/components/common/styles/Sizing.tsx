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

export const MainSmall = styled.main`
  min-height: 100vh;
  max-width: 1300px;
  margin: 0 auto;
  padding: 5rem;

  @media ${device.sm} {
    padding: 3rem 0 5rem;
  }
`;

export const MainBig = styled.main`
  min-height: 100vh;
  position: relative;
  max-width: 1700px;
  margin: 0 auto;
  padding: 5rem;

  @media ${device.sm} {
    padding: 3rem;
  }
`;

export const MainForm = styled(MainBig)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 100;
`;

export const Section = styled.section`
  margin-bottom: 5rem;
`;
