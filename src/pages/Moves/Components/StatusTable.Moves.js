import React from 'react';
import { Link } from 'react-router-dom';

import {
	Table,
	TableContainer,
	THead,
	TName,
	TRow,
} from '../../../components/BaseStyles/Table';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../StyledMoves';

function StatusTable({ status, toggleState }) {
	return (
		<MovesSection visibility={toggleState === 2}>
			<ModifiedLeftTitle>Status</ModifiedLeftTitle>
			<TableContainer>
				<Table>
					<THead>
						<tr>
							<th>Status</th>
							<th>Moves</th>
						</tr>
					</THead>
					<tbody>
						{status
							.filter((s) => s.name !== 'none')
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((s) => (
								<TRow>
									<TName>{s.name.replace(/-/g, ' ')}</TName>
									<StatusMoves>
										{s.moves.map((sm) => (
											<Link to={`/moves/${sm.name}`}>
												<p>{sm.name.replace(/-/g, ' ')}</p>
											</Link>
										))}
									</StatusMoves>
								</TRow>
							))}
					</tbody>
				</Table>
			</TableContainer>
		</MovesSection>
	);
}

export default StatusTable;
