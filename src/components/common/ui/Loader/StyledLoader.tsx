import styled from 'styled-components';

export const LoadingImg = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  & div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SmallLoadingImg = styled(LoadingImg)`
  margin: 3rem 0;
  height: 48px;
`;
