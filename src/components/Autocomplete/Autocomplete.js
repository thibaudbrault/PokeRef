import React, { useState } from 'react'
import { usePokedex } from '../../helpers/DataFetch';
import { Input } from '../BaseStyles/Inputs';
import { AutocompleteContainer, AutocompleteId, AutocompleteLink} from './StyledAutocomplete';

function Autocomplete() {

  const { pokedex } = usePokedex(`https://pokeapi.co/api/v2/pokemon?limit=898`);

  const [pokedexMatch, setPokedexMatch] = useState([]);

  const searchPokedex = (text) => {
    if (!text) {
      setPokedexMatch([])
    } else {
      let matches = pokedex.filter((pokedex) => {
        const regex = new RegExp(`${text}`, 'gi');
        return pokedex?.name?.match(regex);
      });
      setPokedexMatch(matches.slice(0, 5));
    }
  };

  return (
    <Input>
      <label htmlFor="search">Search</label>
      <input
          type="text"
          placeholder='Pokémon Name'
          onChange={(e) => searchPokedex(e.target.value)}
      />
      <AutocompleteContainer>
        <ul>
          {pokedexMatch && pokedexMatch.map((pm) => (
            <li>
              <img src={pm?.sprites?.front_default} alt='' width={32} height={32} />
              <AutocompleteLink 
                to={`/pokemon/${pm.name}`}
                className='bold'
              >
                {pm?.name}
              </AutocompleteLink>
              <AutocompleteId>#{pm?.id?.toString()?.padStart(3, '0')}</AutocompleteId>
            </li>
          ))}
        </ul>
      </AutocompleteContainer>
    </Input>
  )
}

export default Autocomplete