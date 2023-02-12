import styled from 'styled-components';

export const Divider = styled.hr`
  height: 5px;
  width: 90%;
  margin: 3rem auto;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 15px;
`;
