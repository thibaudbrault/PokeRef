import React from 'react';

import {
	ModifiedTable,
	TableContainer,
	THead,
	TName,
	TRow,
} from '/components/BaseStyles/Table';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../StyledMoves';
import Link from 'next/link';

function StatusTable({ status, toggleState }) {
	return (
		<MovesSection visibility={toggleState === 2}>
			<ModifiedLeftTitle>Status</ModifiedLeftTitle>
			<TableContainer>
				<ModifiedTable>
					<THead>
						<tr>
							<th>Status</th>
							<th>Moves</th>
						</tr>
					</THead>
					<tbody>
						{status
							?.filter((s) => s.name !== 'none')
							?.sort((a, b) => a.name.localeCompare(b.name))
							?.map((s) => (
								<TRow key={s.id}>
									<TName>{s.name.replace(/-/g, ' ')}</TName>
									<StatusMoves>
										{s.moves.map((sm) => (
											<Link href={{ pathname: '/move/[name]', query: { name: sm.name }}} key={sm.name} passHref>
												<a>{sm.name.replace(/-/g, ' ')}</a>
											</Link>
										))}
									</StatusMoves>
								</TRow>
							))}
					</tbody>
				</ModifiedTable>
			</TableContainer>
		</MovesSection>
	);
}

export default StatusTable;
