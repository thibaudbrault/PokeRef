import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Data from './Data/Data.PokemonCard';
import Info from './Info/Info.PokemonCard';
import Stats from './Stats/Stats.PokemonCard';
import Moves from './Moves/Moves.PokemonCard';
import Sprites from './Sprites/Sprites.PokemonCard';

import { MainBig } from '../../../components/BaseStyles/Sizing';
import { PokemonSubtitle, PokemonTitle } from './StyledPokemonCard';
import { GenNav } from '../../../components/BaseStyles/Navbars';
import { BackButton } from '../../../components/BaseStyles/Inputs';
import Evolution from './Evolution/Evolution.PokemonCard';
import {
	useEvolution,
	useLocation,
	useMachines,
	useMoves,
	usePokemon,
	useSpecies,
	useTypes,
} from '../../../helpers/DataFetch';
import { LoadingImg } from '../../../components/BaseStyles/Loader';

function PokemonCard() {
	const { name } = useParams();
	const navigate = useNavigate();

	// Import data fetch

	const { pokemon, loading } = usePokemon(
		`https://pokeapi.co/api/v2/pokemon/${name}`
	);

	const { species } = useSpecies(
		`https://pokeapi.co/api/v2/pokemon-species/${name}`
	);

	const { moves } = useMoves('https://pokeapi.co/api/v2/move?limit=826');

	const evolutionChainUrl = species?.evolution_chain?.url;

	const { evolution } = useEvolution(`${evolutionChainUrl}`);

	const { types } = useTypes('https://pokeapi.co/api/v2/type?limit=18');

	const { machines } = useMachines(
		'https://pokeapi.co/api/v2/machine?limit=1700'
	);

	const { location } = useLocation(
		`https://pokeapi.co/api/v2/pokemon/${name}/encounters`
	);

	// Modify game and version according to the id of the pokemon

	const [game, setGame] = useState('');
	const [version, setVersion] = useState('');

	useEffect(() => {
		if (species?.id < 152) {
			setGame('yellow');
			setVersion('yellow');
		} else if (species?.id > 151 && species?.id < 252) {
			setGame('crystal');
			setVersion('crystal');
		} else if (species?.id > 251 && species?.id < 387) {
			setGame('emerald');
			setVersion('emerald');
		} else if (species?.id > 386 && species?.id < 494) {
			setGame('platinum');
			setVersion('platinum');
		} else if (species?.id > 493 && species?.id < 650) {
			setGame('black-2');
			setVersion('black-2-white-2');
		} else if (species?.id > 649 && species?.id < 722) {
			setGame('x');
			setVersion('x-y');
		} else if (species?.id > 721 && species?.id < 810) {
			setGame('ultra-sun');
			setVersion('ultra-sun-ultra-moon');
		} else if (species?.id > 809 && species?.id < 898) {
			setGame('sword');
			setVersion('sword-shield');
		}
	}, [species]);

	// Toggle for moves table

	const [toggleState, setToggleState] = useState(1);
	const toggleTable = (index) => {
		setToggleState(index);
	};

	// Toggle for types table

	const [toggleType, setToggleType] = useState(1);
	const toggleTypeTable = (index) => {
		setToggleType(index);
	};

	// Modify title of the page

	const title = `${name.replace(/-/g, ' ')}`;

	useEffect(() => {
		document.title = `${
			title.charAt(0).toUpperCase() + title.slice(1)
		} | Pokémon | PokéInfo`;
	}, [title]);

	return (
		<MainBig>
			{loading ? (
				<LoadingImg>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
						alt=''
						width={48}
						height={48}
					/>
				</LoadingImg>
			) : (
				<>
					{pokemon?.name?.includes('mega') ? (
						<PokemonTitle>
							{pokemon?.name?.replace(/-/g, ' ').split(' ').reverse().join(' ')}
						</PokemonTitle>
					) : (
						<PokemonTitle>{pokemon?.name?.replace(/-/g, ' ')}</PokemonTitle>
					)}
					<PokemonSubtitle>
						{species?.generation?.name?.replace(/-/g, ' ')}
					</PokemonSubtitle>

					<GenNav>
						<ol>
							{(pokemon?.id < 152 || species?.id < 152) && (
								<li>
									<button>Gen I</button>
									<div>
										<button
											onClick={() => {
												setGame('red');
												setVersion('red-blue');
											}}
										>
											Red
										</button>
										<button
											onClick={() => {
												setGame('blue');
												setVersion('red-blue');
											}}
										>
											Blue
										</button>
										<button
											onClick={() => {
												setGame('yellow');
												setVersion('yellow');
											}}
										>
											Yellow
										</button>
									</div>
								</li>
							)}
							{(pokemon?.id < 252 || species?.id < 252) && (
								<li>
									<button>Gen II</button>
									<div>
										<button
											onClick={() => {
												setGame('gold');
												setVersion('gold-silver');
											}}
										>
											Gold
										</button>
										<button
											onClick={() => {
												setGame('silver');
												setVersion('gold-silver');
											}}
										>
											Silver
										</button>
										<button
											onClick={() => {
												setGame('crystal');
												setVersion('crystal');
											}}
										>
											Crystal
										</button>
									</div>
								</li>
							)}
							{(pokemon?.id < 387 || species?.id < 387) && (
								<li>
									<button>Gen III</button>
									<div>
										<button
											onClick={() => {
												setGame('ruby');
												setVersion('ruby-sapphire');
											}}
										>
											Ruby
										</button>
										<button
											onClick={() => {
												setGame('sapphire');
												setVersion('rub-sapphire');
											}}
										>
											Sapphire
										</button>
										<button
											onClick={() => {
												setGame('emerald');
												setVersion('emerald');
											}}
										>
											Emerald
										</button>
										<button
											onClick={() => {
												setGame('firered');
												setVersion('firered-leafgreen');
											}}
										>
											Fire Red
										</button>
										<button
											onClick={() => {
												setGame('leafgreen');
												setVersion('firered-leafgreen');
											}}
										>
											Leaf Green
										</button>
									</div>
								</li>
							)}
							{(pokemon?.id < 494 || species?.id < 494) && (
								<li>
									<button>Gen IV</button>
									<div>
										<button
											onClick={() => {
												setGame('diamond');
												setVersion('diamond-pearl');
											}}
										>
											Diamond
										</button>
										<button
											onClick={() => {
												setGame('pearl');
												setVersion('diamond-pearl');
											}}
										>
											Pearl
										</button>
										<button
											onClick={() => {
												setGame('platinum');
												setVersion('platinum');
											}}
										>
											Platinum
										</button>
										<button
											onClick={() => {
												setGame('heartgold');
												setVersion('heartgold-soulsilver');
											}}
										>
											Heart Gold
										</button>
										<button
											onClick={() => {
												setGame('soulsilver');
												setVersion('heartgold-soulsilver');
											}}
										>
											Soul Silver
										</button>
									</div>
								</li>
							)}
							{(pokemon?.id < 650 || species?.id < 650) && (
								<li>
									<button>Gen V</button>
									<div>
										<button
											onClick={() => {
												setGame('black');
												setVersion('black-white');
											}}
										>
											Black
										</button>
										<button
											onClick={() => {
												setGame('white');
												setVersion('black-white');
											}}
										>
											White
										</button>
										<button
											onClick={() => {
												setGame('black-2');
												setVersion('black-2-white-2');
											}}
										>
											Black 2
										</button>
										<button
											onClick={() => {
												setGame('white-2');
												setVersion('black-2-white-2');
											}}
										>
											White 2
										</button>
									</div>
								</li>
							)}
							{(pokemon?.id < 722 || species?.id < 722) && (
								<li>
									<button>Gen VI</button>
									<div>
										<button
											onClick={() => {
												setGame('x');
												setVersion('x-y');
											}}
										>
											X
										</button>
										<button
											onClick={() => {
												setGame('y');
												setVersion('x-y');
											}}
										>
											Y
										</button>
										<button
											onClick={() => {
												setGame('omega-ruby');
												setVersion('omega-ruby-alpha-sapphire');
											}}
										>
											Omega Ruby
										</button>
										<button
											onClick={() => {
												setGame('alpha-sapphire');
												setVersion('omega-ruby-alpha-sapphire');
											}}
										>
											Alpha Sapphire
										</button>
									</div>
								</li>
							)}
							{(pokemon?.id < 810 || species?.id < 810) && (
								<li>
									<button>Gen VII</button>
									<div>
										<button
											onClick={() => {
												setGame('sun');
												setVersion('sun-moon');
											}}
										>
											Sun
										</button>
										<button
											onClick={() => {
												setGame('moon');
												setVersion('sun-moon');
											}}
										>
											Moon
										</button>
										<button
											onClick={() => {
												setGame('ultra-sun');
												setVersion('ultra-sun-ultra-moon');
											}}
										>
											Ultra Sun
										</button>
										<button
											onClick={() => {
												setGame('ultra-moon');
												setVersion('ultra-sun-ultra-moon');
											}}
										>
											Ultra Moon
										</button>
										<button
											onClick={() => {
												setGame('lets-go-pikachu');
												setVersion('lets-go-pikachu-lets-go-eevee');
											}}
										>
											Let's Go Pikachu
										</button>
										<button
											onClick={() => {
												setGame('lets-go-eevee');
												setVersion('lets-go-pikachu-lets-go-eevee');
											}}
										>
											Let's Go Eevee
										</button>
									</div>
								</li>
							)}
							{(pokemon?.id < 899 || species?.id < 899) && (
								<li>
									<button>Gen VIII</button>
									<div>
										<button
											onClick={() => {
												setGame('sword');
												setVersion('sword-shield');
											}}
										>
											Sword
										</button>
										<button
											onClick={() => {
												setGame('shield');
												setVersion('sword-shield');
											}}
										>
											Shield
										</button>
									</div>
								</li>
							)}
						</ol>
					</GenNav>

					<Data
						pokemon={pokemon}
						species={species}
						location={location}
						game={game}
					/>

					<Evolution species={species} evolution={evolution} />

					<Info pokemon={pokemon} species={species} evolution={evolution} />

					<Stats
						toggleType={toggleType}
						toggleTypeTable={toggleTypeTable}
						pokemon={pokemon}
						type={types}
					/>

					<Moves
						toggleState={toggleState}
						toggleTable={toggleTable}
						pokemon={pokemon}
						moves={moves}
						machine={machines}
						version={version}
						game={game}
					/>

					<Sprites pokemon={pokemon} />

					<BackButton onClick={() => navigate('/')}>
						ᐸ Back to pokemon
					</BackButton>
				</>
			)}
		</MainBig>
	);
}

export default PokemonCard;
