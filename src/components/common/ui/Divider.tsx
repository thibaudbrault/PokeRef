import styled from 'styled-components';

export const Divider = styled.hr`
  width: 90%;
  margin: 5rem auto;
  border-width: 0 0 1px 0;
  background-color: ${({ theme }) => theme.secondary};
`;
