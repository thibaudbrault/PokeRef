import React, { useState, useEffect } from 'react';
import Method from '../../../../components/Method/Method';

import {
	PokemonMovesSection,
	PokemonMovesTd,
	PokemonMovesEmpty,
	PokemonMovesMachine,
	PokemonMovesContainer,
	PokemonMovesTable,
} from './StyledMoves.PokemonCard';
import {
	THead,
	TRow,
	TLink,
} from '../../../../components/BaseStyles/Table';
import { H3, Span } from '../../../../components/BaseStyles/Headings';
import { Type } from '../../../../components/BaseStyles/Themes';
import { Link } from 'react-router-dom';

function Moves({
	toggleState,
	toggleTable,
	pokemon,
	moves,
	machines,
	version,
	game,
}) {
	const [learn, setLearn] = useState();

	useEffect(() => {
		if (toggleState === 1) {
			setLearn('level-up');
		} else if (toggleState === 2) {
			setLearn('machine');
		} else if (toggleState === 3) {
			setLearn('egg');
		} else if (toggleState === 4) {
			setLearn('tutor');
		}
	}, [toggleState]);

	const isLearnedMoveForVersion = (version) => (pmv) =>
		pmv?.version_group?.name === version &&
		pmv?.move_learn_method?.name === learn;

	const isLearnedMove = isLearnedMoveForVersion(version);

	// const emptyMoves = (
	// 	<PokemonMovesEmpty>
	// 		<span>{pokemon?.name?.replace(/-/g, ' ')}</span> ‌‌ doesn't learn any
	// 		moves this way in Pokémon ‌‌ <span>{game}</span>
	// 	</PokemonMovesEmpty>
	// );

	const moveInfoTable = (pm) =>
		moves?.map(
			(m) =>
				m?.name === pm?.move?.name && (
					<>
						<PokemonMovesTd>
							<Type id={m?.type?.name} style={{ background: 'transparent' }}>
								<Link to={m?.type?.name}>
									<img
										alt={m?.type?.name}
										width={32}
										height={32}
										style={{ cursor: 'pointer' }}
									/>
								</Link>
							</Type>
						</PokemonMovesTd>
						<PokemonMovesTd>{m?.damage_class?.name}</PokemonMovesTd>
						<PokemonMovesTd>
							{m?.power !== null ? m?.power : '-'}
						</PokemonMovesTd>
						<PokemonMovesTd>{m?.pp}</PokemonMovesTd>
						<PokemonMovesTd>
							{m?.accuracy !== null ? m?.accuracy : '-'}
						</PokemonMovesTd>
						<PokemonMovesTd>{m?.priority}</PokemonMovesTd>
						<PokemonMovesTd>
							{m?.meta?.ailment !== null
								? m?.meta?.ailment?.name
										?.replace('none', '-')
										.replace(/-/g, ' ')
								: '-'}
						</PokemonMovesTd>
					</>
				)
		);

	const dataMoves = pokemon?.moves?.map((pm) =>
		pm?.version_group_details?.map(
			(pmv) =>
				isLearnedMove(pmv) && (
					<TRow>
						{(() => {
							if (learn === 'level-up' && pmv?.level_learned_at === 0) {
								return (
									<PokemonMovesTd>
										<Span>evolution</Span>
									</PokemonMovesTd>
								);
							} else if (learn === 'level-up' && pmv?.level_learned_at !== 0) {
								return <td>{pmv?.level_learned_at}</td>;
							}
						})()}
						{learn === 'machine' &&
							machines?.map(
								(ma) =>
									ma?.move?.name === pm?.move?.name &&
									ma?.version_group?.name === version && (
										<PokemonMovesMachine>{ma?.item?.name}</PokemonMovesMachine>
									)
							)}
						{learn === 'egg' && <td>-</td>}
						{learn === 'tutor' && <td>-</td>}
						<td>
							<TLink to={`/moves/${pm?.move?.name}`}>
								{pm?.move?.name.replace(/-/g, ' ')}
							</TLink>
						</td>
						{moveInfoTable(pm)}
					</TRow>
				)
		)
	);

	return (
		<PokemonMovesSection>
			<H3>Moves</H3>
			<Method toggleState={toggleState} toggleTable={toggleTable} />
			<PokemonMovesContainer>
				<PokemonMovesTable>
					<THead>
						<tr>
							<th>
								{learn === 'level-up'
									? 'Level'
									: learn === 'machine'
									? 'Machine'
									: '-'}
							</th>
							<th>Name</th>
							<th>Type</th>
							<th>Category</th>
							<th>Power</th>
							<th>PP</th>
							<th>Accuracy</th>
							<th>Priority</th>
							<th>Status</th>
						</tr>
					</THead>
					<tbody>
						<>{dataMoves}</>
					</tbody>
				</PokemonMovesTable>
			</PokemonMovesContainer>
		</PokemonMovesSection>
	);
}

export default Moves;
