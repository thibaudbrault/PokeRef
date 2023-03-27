import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  height: 5vh;
  background: hsla(29, 92%, 70%, 1);
  background: linear-gradient(
    0deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
  background: -moz-linear-gradient(
    0deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
`;

export const FooterInner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  align-items: center;
  color: #161616;
`;

export const LeftFooter = styled.div`
  justify-self: left;
  font-size: 1.3rem;
`;

export const CenterFooter = styled.div`
  justify-self: center;
  font-size: 4rem;
  letter-spacing: 1px;
  font-family: 'Oswald';
  color: ${({ theme }) => theme.secondary};
  text-shadow: ${({ theme }) => theme.main} -1px -1px 0px,
    ${({ theme }) => theme.main} 1px -1px 0px,
    ${({ theme }) => theme.main} -1px 1px 0px,
    ${({ theme }) => theme.main} 1px 1px 0px;
  text-align: center;
`;

export const RightFooter = styled.div`
  justify-self: right;
  height: 4rem;
  width: 4rem;

  & a {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;

    & svg {
      width: 100%;
      height: 100%;
    }
  }
`;
