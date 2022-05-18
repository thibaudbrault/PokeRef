import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { MainBig } from '../../../components/BaseStyles/Sizing';
import {
	AbilityCardEffect,
	AbilityCardSection,
	AbilityCardTable,
	AbilityCardTableContainer,
	Sup,
} from './StyledAbilityCard';
import {
	CardTitle,
	H3,
	H4,
	Span,
	Subtitle,
} from '../../../components/BaseStyles/Headings';
import {
	Table,
	THead,
	TLink,
	TName,
	TRow,
} from '../../../components/BaseStyles/Table';
import { BackButton } from '../../../components/BaseStyles/Inputs';
import { useAbility, usePokedex } from '../../../helpers/DataFetch';

const AbilityCard = () => {
	const { name } = useParams();
	const navigate = useNavigate();

	const { ability, loading } = useAbility(
		`https://pokeapi.co/api/v2/ability/${name}`
	);

	const { pokedex } = usePokedex(
		'https://pokeapi.co/api/v2/pokemon?limit=1300'
	);

	const title = `${name.replace(/-/g, ' ')}`;

	useEffect(() => {
		document.title = `${
			title.charAt(0).toUpperCase() + title.slice(1)
		} | Abilities | PokéInfo`;
	}, [title]);

	return (
		<MainBig>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<CardTitle>{ability?.name?.replace(/-/g, ' ')}</CardTitle>
					<Subtitle>{ability?.generation?.name?.replace(/-/g, ' ')}</Subtitle>

					<AbilityCardSection>
						<AbilityCardEffect>
							<H3>Effect</H3>
							{ability?.effect_entries?.map(
								(ae) => ae?.language?.name === 'en' && <p>{ae?.effect}</p>
							)}
						</AbilityCardEffect>
						{ability?.effect_entries?.map(
							(ae) =>
								ae?.language?.name === 'en' &&
								ae?.effect?.includes('\n\nOverworld:') && (
									<AbilityCardEffect>
										<H4>Overworld</H4>
									</AbilityCardEffect>
								)
						)}
					</AbilityCardSection>

					<AbilityCardSection>
						<H3>Game descriptions</H3>
						<AbilityCardTable>
							<tbody>
								{ability?.flavor_text_entries?.map((af) =>
									af?.language?.name === 'en' ? (
										<tr>
											<th>{af?.version_group?.name?.replace(/-/g, ' ')}</th>
											<td>{af?.flavor_text}</td>
										</tr>
									) : (
										''
									)
								)}
							</tbody>
						</AbilityCardTable>
					</AbilityCardSection>

					<AbilityCardSection>
						<H3>
							Pokemon with <Span>{ability?.name?.replace(/-/g, ' ')}</Span>
						</H3>
						<AbilityCardTableContainer>
							<Table>
								<THead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>
											1<Sup>st</Sup> ability
										</th>
										<th>
											2<Sup>nd</Sup> ability
										</th>
										<th>Hidden ability</th>
									</tr>
								</THead>
								<tbody>
									{ability?.pokemon?.map((ap) => (
										<TRow>
											<td>
												{pokedex?.map(
													(p) =>
														p.name === ap.pokemon.name && (
															<img
																src={p.sprites.front_default}
																alt='-'
																loading='lazy'
																width={64}
																height={64}
															/>
														)
												)}
											</td>
											<TName>
												<TLink
													to={`/ability/${ability.name}`}
													key={ap.pokemon.name}
												>
													{ap.pokemon.name.replace(/-/g, ' ')}
												</TLink>
											</TName>
											<td>
												{pokedex?.map(
													(p) =>
														p.name === ap.pokemon.name && (
															<TLink
																to={`/abilities/${p?.abilities[0]?.ability?.name}`}
																className={
																	p?.abilities[0]?.ability?.name === ability?.name
																		? 'bold'
																		: ''
																}
															>
																{p?.abilities[0]?.ability?.name?.replace(
																	/-/g,
																	' '
																)}
															</TLink>
														)
												)}
											</td>
											<td>
												{pokedex?.map(
													(p) =>
														p.name === ap.pokemon.name && (
															<TLink
																to={`/abilities/${p?.abilities[1]?.ability?.name}`}
																className={
																	p?.abilities[1]?.ability?.name === ability?.name
																		? 'bold'
																		: ''
																}
															>
																{p?.abilities?.length > 1
																	? p?.abilities[1]?.ability?.name?.replace(
																			/-/g,
																			' '
																	)
																	: '-'}
															</TLink>
														)
												)}
											</td>
											<td>
												{pokedex?.map(
													(p) =>
														p.name === ap.pokemon.name && (
															<TLink
																to={`/abilities/${p?.abilities[2]?.ability?.name.name}`}
																className={
																	p?.abilities[2]?.ability?.name === ability?.name
																		? 'bold'
																		: ''
																}
															>
																{p?.abilities?.length > 2
																	? p?.abilities[2]?.ability?.name?.replace(
																			/-/g,
																			' '
																	)
																	: '-'}
															</TLink>
														)
												)}
											</td>
										</TRow>
									))}
								</tbody>
							</Table>
						</AbilityCardTableContainer>
					</AbilityCardSection>

					<BackButton onClick={() => navigate('/abilities')}>
						{' '}
						ᐸ Back to abilities
					</BackButton>
				</>
			)}
		</MainBig>
	);
};

export default AbilityCard;
