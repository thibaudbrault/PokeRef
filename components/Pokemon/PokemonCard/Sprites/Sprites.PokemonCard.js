import React from 'react';
import Image from 'next/image';
import { H3 } from '/components/BaseStyles/Headings';
import { Section } from '/components/BaseStyles/Sizing';
import {
	PokemonAnimatedSpritesDiv,
	PokemonSpritesDiv,
} from './StyledSprites.PokemonCard';

function Sprites({ pokemon }) {
	return (
		<>
			<Section>
				<H3>Sprites</H3>
				<PokemonSpritesDiv>
					<div>
						<Image
							src={pokemon?.sprites?.front_default}
							alt={pokemon?.name}
							width={96}
							height={96}
						/>
						<p>Front Default</p>
					</div>
					<div>
						<Image
							src={pokemon?.sprites?.back_default}
							alt={pokemon?.name}
							width={96}
							height={96}
						/>
						<p>Back Default</p>
					</div>
					{pokemon?.sprites?.front_female !== null && (
						<div>
							<Image
								src={pokemon?.sprites?.front_female}
								alt={pokemon?.name}
								width={96}
								height={96}
							/>
							<p>Front Female</p>
						</div>
					)}
					{pokemon?.sprites?.back_female !== null && (
						<div>
							<Image
								src={pokemon?.sprites?.back_female}
								alt={pokemon?.name}
								width={96}
								height={96}
							/>
							<p>Back Female</p>
						</div>
					)}
					<div>
						<Image
							src={pokemon?.sprites?.front_shiny}
							alt={pokemon?.name}
							width={96}
							height={96}
						/>
						<p>Front Shiny</p>
					</div>
					<div>
						<Image
							src={pokemon?.sprites?.back_shiny}
							alt={pokemon?.name}
							width={96}
							height={96}
						/>
						<p>Back Shiny</p>
					</div>
					{pokemon?.sprites?.front_shiny_female !== null && (
						<div>
							<Image
								src={pokemon?.sprites?.front_shiny_female}
								alt={pokemon?.name}
								width={96}
								height={96}
							/>
							<p>Front Shiny Female</p>
						</div>
					)}
					{pokemon?.sprites?.back_shiny_female !== null && (
						<div>
							<Image
								src={pokemon?.sprites?.back_shiny_female}
								alt={pokemon?.name}
								width={96}
								height={96}
							/>
							<p>Back Shiny Female</p>
						</div>
					)}
				</PokemonSpritesDiv>
			</Section>

			{pokemon?.id < 650 && (
				<Section>
					<H3>Animated Sprites</H3>
					<PokemonAnimatedSpritesDiv>
						<div>
							<Image
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`}
								alt={pokemon?.name}
								width={48}
								height={48}
							/>
							<p>Front Default</p>
						</div>
						<div>
							<Image
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${pokemon?.id}.gif`}
								alt={pokemon?.name}
								width={48}
								height={48}
							/>
							<p>Back Default</p>
						</div>
						{pokemon?.sprites?.front_female !== null && (
							<div>
								<Image
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
									width={48}
									height={48}
								/>
								<p>Front Female</p>
							</div>
						)}
						{pokemon?.sprites?.back_female !== null && (
							<div>
								<Image
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
									width={48}
									height={48}
								/>
								<p>Back Female</p>
							</div>
						)}
						<div>
							<Image
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${pokemon?.id}.gif`}
								alt={pokemon?.name}
								width={48}
								height={48}
							/>
							<p>Front Shiny</p>
						</div>
						<div>
							<Image
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/${pokemon?.id}.gif`}
								alt={pokemon?.name}
								width={48}
								height={48}
							/>
							<p>Back Shiny</p>
						</div>
						{pokemon?.sprites?.front_shiny_female !== null && (
							<div>
								<Image
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
									width={48}
									height={48}
								/>
								<p>Front Shiny Female</p>
							</div>
						)}
						{pokemon?.sprites?.back_shiny_female !== null && (
							<div>
								<Image
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/female/${pokemon?.id}.gif`}
									alt={pokemon?.name}
									width={48}
									height={48}
								/>
								<p>Back Shiny Female</p>
							</div>
						)}
					</PokemonAnimatedSpritesDiv>
				</Section>
			)}
		</>
	);
}

export default Sprites;
