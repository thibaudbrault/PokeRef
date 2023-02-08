import { IPokemon } from '@/types/Pokemon/Pokemon';
import { Evolution, Species } from '@/types/types';
import Breeding from './Breeding/Breeding.PokemonCard';
import Forms from './Forms/Forms.PokemonCard';
import { PokemonInfoSection } from './Styled.Info.PokemonCard';
import Training from './Training/Training.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: Species.Species;
  evolution: Evolution.Evolution;
};

function Info({ pokemon, species, evolution }: Props) {
  return (
    <PokemonInfoSection>
      <Breeding pokemon={pokemon} species={species} evolution={evolution} />
      <Training pokemon={pokemon} species={species} />
      <Forms pokemon={pokemon} species={species} />
    </PokemonInfoSection>
  );
}

export default Info;
