import React from 'react';
import { H3 } from '../../../../components/BaseStyles/Headings';
import {
	PokemonAnimatedSpritesDiv,
	PokemonSpritesDiv,
	PokemonSpritesSection,
} from './StyledSprites.PokemonCard';

function Sprites({ pokemon }) {
	return (
		<>
			<PokemonSpritesSection>
				<H3>Sprites</H3>
				<PokemonSpritesDiv>
					<div>
						<img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
						<p>Front Default</p>
					</div>
					<div>
						<img src={pokemon?.sprites?.back_default} alt={pokemon?.name} />
						<p>Back Default</p>
					</div>
					{pokemon?.sprites?.front_female !== null && (
						<div>
							<img src={pokemon?.sprites?.front_female} alt={pokemon?.name} />
							<p>Front Female</p>
						</div>
					)}
					{pokemon?.sprites?.back_female !== null && (
						<div>
							<img src={pokemon?.sprites?.back_female} alt={pokemon?.name} />
							<p>Back Female</p>
						</div>
					)}
					<div>
						<img src={pokemon?.sprites?.front_shiny} alt={pokemon?.name} />
						<p>Front Shiny</p>
					</div>
					<div>
						<img src={pokemon?.sprites?.back_shiny} alt={pokemon?.name} />
						<p>Back Shiny</p>
					</div>
					{pokemon?.sprites?.front_shiny_female !== null && (
						<div>
							<img
								src={pokemon?.sprites?.front_shiny_female}
								alt={pokemon?.name}
							/>
							<p>Front Shiny Female</p>
						</div>
					)}
					{pokemon?.sprites?.back_shiny_female !== null && (
						<div>
							<img
								src={pokemon?.sprites?.back_shiny_female}
								alt={pokemon?.name}
							/>
							<p>Back Shiny Female</p>
						</div>
					)}
				</PokemonSpritesDiv>
			</PokemonSpritesSection>

			{pokemon?.id < 650 && (
				<PokemonSpritesSection>
					<H3>Animated Sprites</H3>
					<PokemonAnimatedSpritesDiv>
						<div>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`}
								alt={pokemon?.name}
							/>
							<p>Front Default</p>
						</div>
						<div>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${pokemon?.id}.gif`}
								alt={pokemon?.name}
							/>
							<p>Back Default</p>
						</div>
						{pokemon?.sprites?.front_female !== null && (
							<div>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
								/>
								<p>Front Female</p>
							</div>
						)}
						{pokemon?.sprites?.back_female !== null && (
							<div>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
								/>
								<p>Back Female</p>
							</div>
						)}
						<div>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${pokemon?.id}.gif`}
								alt={pokemon?.name}
							/>
							<p>Front Shiny</p>
						</div>
						<div>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/${pokemon?.id}.gif`}
								alt={pokemon?.name}
							/>
							<p>Back Shiny</p>
						</div>
						{pokemon?.sprites?.front_shiny_female !== null && (
							<div>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
								/>
								<p>Front Shiny Female</p>
							</div>
						)}
						{pokemon?.sprites?.back_shiny_female !== null && (
							<div>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
								/>
								<p>Back Shiny Female</p>
							</div>
						)}
					</PokemonAnimatedSpritesDiv>
				</PokemonSpritesSection>
			)}
		</>
	);
}

export default Sprites;
