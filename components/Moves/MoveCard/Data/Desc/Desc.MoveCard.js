import Image from 'next/future/image';
import Link from 'next/link';
import React from 'react';
import {
	MoveCardDataCategory,
	MoveCardDataTable,
	MoveCardDataType,
} from '../StyledData.MoveCard';

function Desc({ move, version, machines }) {
	// Calculate the max number of pp for a move
	const maxPp = move?.pp * 1.6;

	return (
		<MoveCardDataTable>
			<tbody>
				<tr>
					<th>Type</th>
					<td>
						<MoveCardDataType id={move?.type?.name}>
							<Link
								href={{
									pathname: '/type/[name]',
									query: { name: move.type.name },
								}}
								key={move?.type?.name}
								passHref
							>
								<a>
									<Image alt={move?.type?.name} width={20} height={20} />
									<span>{move?.type?.name}</span>
								</a>
							</Link>
						</MoveCardDataType>
					</td>
				</tr>
				<tr>
					<th>Category</th>
					<MoveCardDataCategory id={move?.damage_class?.name}>
						<div>
							<Image alt={move?.damage_class?.name} />
							<span>{move?.damage_class?.name}</span>
						</div>
					</MoveCardDataCategory>
				</tr>
				{machines?.map(
					(ma) =>
						ma?.version_group?.name === version &&
						ma?.move?.name === move?.name && (
							<tr>
								<th>Machine / Record</th>
								<td>
									<span>{ma?.item?.name.toUpperCase()}</span>
								</td>
							</tr>
						)
				)}
				<tr>
					<th>Power</th>
					<td>{move?.power !== null ? move?.power : '-'}</td>
				</tr>
				<tr>
					<th>PP</th>
					<td>
						{move?.pp} (max. {maxPp})
					</td>
				</tr>
				<tr>
					<th>Accuracy</th>
					<td>{move?.accuracy !== null ? move?.accuracy : '-'}</td>
				</tr>
				<tr>
					<th>Status</th>
					<td>{move?.meta?.ailment?.name?.replace('none', '-')}</td>
				</tr>
				<tr>
					<th>Priority</th>
					<td>{move?.priority}</td>
				</tr>
			</tbody>
		</MoveCardDataTable>
	);
}

export default Desc;
