import styled from 'styled-components';
import { ModifiedSearch } from '../../components/BaseStyles/Inputs';
import { device } from '../../components/BaseStyles/Sizing';
import { Table } from '../../components/BaseStyles/Table';

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
