import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { capitalize } from '@/utils/Typography';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Base from './Base/Base.PokemonCard';
import Desc from './Desc/Desc.PokemonCard';
import Sprite from './Sprite/Sprite.PokemonCard';
import {
  PokemonCatchButton,
  PokemonDataContainer,
  PokemonDataSection,
  PokemonDataSprite,
} from './Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  game: string | null;
};

function Data({ pokemon, species, game }: Props) {
  const [catchable, setCatchable] = useState<boolean>(true);

  const catchHandler = () => {
    Math.random() < species.capture_rate / 765 &&
      (setCatchable(false),
        toast.success(`Congrats 🎉 ! You caught ${capitalize(pokemon.name)}`, {
          style: {
            fontSize: `1.7rem`,
          },
        }));
  };

  return (
    <PokemonDataSection id="presentation">
      <PokemonCatchButton onClick={catchHandler}>
        {catchable ? 'Catch' : 'Caught'}
      </PokemonCatchButton>
      <PokemonDataContainer>
        <Desc species={species} pokemon={pokemon} game={game} />
        <Base species={species} pokemon={pokemon} />
      </PokemonDataContainer>
      <PokemonDataSprite>
        <Sprite species={species} pokemon={pokemon} />
      </PokemonDataSprite>
    </PokemonDataSection>
  );
}

export default Data;
