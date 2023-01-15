import styled from 'styled-components';
import { ModifiedSearch } from '../../common/styles/Inputs';
import { device } from '../../common/styles/Sizing';
import { Table } from '../../common/styles/Table';

export const MachinesSearch = styled(ModifiedSearch)`
  @media ${device.sm} {
    margin-bottom: 0;
  }
`;

export const MachinesTable = styled(Table)`
  width: 100%;
  @media ${device.sm} {
    width: 95%;
    margin: 0 auto;
  }
`;
