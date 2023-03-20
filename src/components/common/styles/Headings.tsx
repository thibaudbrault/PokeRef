import styled from 'styled-components';
import { device } from './Sizing';

export const H1 = styled.h1`
  padding: 0 1rem;
  font-family: 'Press Start 2P';
  font-size: 6rem;
  letter-spacing: 3px;
  cursor: pointer;
  color: ${({ theme }) => theme.main};
  text-shadow: ${({ theme }) => theme.secondary} -2px -2px 0px,
    ${({ theme }) => theme.secondary} 2px -2px 0px,
    ${({ theme }) => theme.secondary} -2px 2px 0px,
    ${({ theme }) => theme.secondary} 2px 2px 0px;

  @media ${device.lg} {
    font-size: 5rem;
  }

  @media ${device.md} {
    font-size: 4.5rem;
  }

  @media ${device.sm} {
    font-size: 3.7rem;
  }

  @media ${device.xs} {
    font-size: 3rem;
  }
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 4rem;
  font-family: 'Press Start 2P';
  color: #c4c4c4;
  text-transform: capitalize;
  text-align: center;
  color: ${({ theme }) => theme.main};
  text-shadow: ${({ theme }) => theme.secondary} -1px -1px 0px,
    ${({ theme }) => theme.secondary} 1px -1px 0px,
    ${({ theme }) => theme.secondary} -1px 1px 0px,
    ${({ theme }) => theme.secondary} 1px 1px 0px;
`;

export const LeftTitle = styled(Title)`
  text-align: left;
`;

export const CardTitle = styled(Title)`
  margin-bottom: 0.5rem;
`;

export const CardTitleWithImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  & img {
    @media ${device.sm} {
      width: 48px;
      height: 48px;
    }
  }
`;

export const Subtitle = styled.h4`
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  text-align: center;
`;

export const LeftSubtitle = styled(Subtitle)`
  text-align: left;
`;

export const H2 = styled.h2`
  margin-bottom: 1rem;
  font-size: 4.5rem;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;

export const H3 = styled.h3`
  margin-bottom: 1rem;
  font-size: 3.5rem;
  font-weight: 700;
  text-transform: capitalize;
`;

export const H4 = styled.h4`
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: capitalize;
`;

export const Capitalize = styled.span`
  text-transform: capitalize;
`;

export const Bold = styled.span`
  font-weight: 700;
`;

export const Small = styled.small`
  margin-top: -0.5rem;
  font-size: 1.2rem;
`;