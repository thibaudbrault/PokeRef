import React, { useState } from 'react';
import { AutocompleteContainer } from '../../../components/Autocomplete/StyledAutocomplete';
import { usePokedex } from '../../../helpers/DataFetch';
import { TeamAdd, TeamColumn, TeamGrid, TeamImg } from '../StyledProfile'

function Team() {

	const { pokedex } = usePokedex(
		`https://pokeapi.co/api/v2/pokemon?limit=898`
	);

    const [pokedexTeamMatch, setPokedexTeamMatch] = useState([]);

	const searchTeamPokedex = (text) => {
		if (!text) {
			setPokedexTeamMatch([]);
		} else {
			let matches = pokedex.filter((pokedex) => {
				const regex = new RegExp(`${text}`, 'gi');
				return pokedex?.name?.match(regex);
			});
			setPokedexTeamMatch(matches.slice(0, 5));
		}
	};

    return (
        <TeamGrid>
            <TeamColumn>
                <TeamImg>
                    
                </TeamImg>
                <TeamAdd>
                    <label htmlFor="pokemon">Pokémon</label>
                    <input type="text" name="pokemon" onChange={(e) => searchTeamPokedex(e.target.value)} />
                    <AutocompleteContainer>
                        <ul>
                            {pokedexTeamMatch &&
                                pokedexTeamMatch.map((pm) => (
                                    <li>
                                        <p>
                                            {pm?.name}
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </AutocompleteContainer>
                </TeamAdd>
            </TeamColumn>
            <TeamColumn>
                <div>

                </div>
                <TeamAdd>
                    <label htmlFor="item">Item</label>
                    <input type="text" name="item" />
                </TeamAdd>
                <TeamAdd>
                    <label htmlFor="ability">Ability</label>
                    <input type="text" name="ability" />
                </TeamAdd>
            </TeamColumn>
            <TeamColumn>
                <TeamAdd>
                    <label htmlFor="atk1">Attack 1</label>
                    <input type="text" name="atk1" />
                </TeamAdd>
                <TeamAdd>
                    <label htmlFor="atk2">Attack 2</label>
                    <input type="text" name="atk2" />
                </TeamAdd>
                <TeamAdd>
                    <label htmlFor="atk3">Attack 3</label>
                    <input type="text" name="atk3" />
                </TeamAdd>
                <TeamAdd>
                    <label htmlFor="atk4">Attack 4</label>
                    <input type="text" name="atk4" />
                </TeamAdd>
            </TeamColumn>
        </TeamGrid>
    )
}

export default Team