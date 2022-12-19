import React from 'react';
import { H3 } from '@/components/common/styles/Headings';
import { PokemonInfoTable } from '../Styled.Info.PokemonCard';
import { Evolution, Pokemon, Species } from '@/types/types';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
  evolution: Evolution.Evolution;
};

function Breeding({ pokemon, species, evolution }: Props) {
  // Returns the gender rate for male and female in percent
  const female = (species.gender_rate / 8) * 100;
  const male = 100 - (species.gender_rate / 8) * 100;

  return (
    <div>
      <H3>Breeding</H3>
      <PokemonInfoTable>
        <tbody>
          <tr>
            <th>Gender</th>
            <td>
              {pokemon.id < 10000 ? (
                species.gender_rate !== -1 ? (
                  <p>
                    {male}% male
                    <br />
                    {female}% female
                  </p>
                ) : (
                  <p>genderless</p>
                )
              ) : (
                `⠀`
              )}
            </td>
          </tr>
          <tr>
            <th>Egg groups</th>
            <td>
              {pokemon.id < 10000
                ? species.egg_groups?.map((seg) => (
                    <p key={seg.name}>{seg.name}</p>
                  ))
                : `⠀`}
            </td>
          </tr>
          <tr>
            <th>Egg cycles</th>
            <td>
              {pokemon.id < 10000 ? <p>{species.hatch_counter} cycles</p> : `⠀`}
            </td>
          </tr>
          <tr>
            <th>Baby trigger item</th>
            <td>
              {pokemon.id < 10000 && evolution?.baby_trigger_item !== null ? (
                <p>{evolution?.baby_trigger_item?.name.replace(/-/g, ` `)}</p>
              ) : (
                `None`
              )}
            </td>
          </tr>
          <tr>
            <th>Habitat</th>
            <td>
              {pokemon.id < 10000 ? (
                species.habitat !== null ? (
                  <p>{species.habitat.name}</p>
                ) : (
                  `Undiscovered`
                )
              ) : (
                `⠀`
              )}
            </td>
          </tr>
        </tbody>
      </PokemonInfoTable>
    </div>
  );
}

export default Breeding;
