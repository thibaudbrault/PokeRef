import React, { useState } from 'react';
import { usePokedex, useItems } from '../../../helpers/DataFetch';
import { TeamAdd, TeamAutocomplete, TeamColumn, TeamGrid, TeamImg } from '../StyledProfile'

function Team() {

	const { pokedex } = usePokedex(
		`https://pokeapi.co/api/v2/pokemon?limit=25`
	);

    const { items } = useItems(
		'https://pokeapi.co/api/v2/item?limit=1608'
	);

    const [pokedexTeamMatch, setPokedexTeamMatch] = useState([]);
    const [pokedexValue, setPokedexValue] = useState('');

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

    const [itemsTeamMatch, setItemsTeamMatch] = useState([]);

	const searchTeamItems = (text) => {
		if (!text) {
			setItemsTeamMatch([]);
		} else {
			let matches = items.filter((items) => {
				const regex = new RegExp(`${text}`, 'gi');
				return items?.name?.match(regex);
			});
			setItemsTeamMatch(matches.slice(0, 5));
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
                    <TeamAutocomplete>
                        <ul>
                            {pokedexTeamMatch &&
                                pokedexTeamMatch.map((pm) => (
                                    <li onClick={() => setPokedexValue(pokedexTeamMatch)}>
                                        <span>
                                            {pm?.name}
                                        </span>
                                        <span>
                                            {pm?.types?.[0]?.type?.name} <br />
                                            {pm?.types?.length === 2 ? (
                                                <>
                                                    {pm?.types?.[1]?.type?.name}
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </TeamAutocomplete>
                </TeamAdd>
            </TeamColumn>
            <TeamColumn>
                <div>

                </div>
                <TeamAdd>
                    <label htmlFor="item">Item</label>
                    <input type="text" name="item" onChange={(e) => searchTeamItems(e.target.value)} />
                    <TeamAutocomplete>
                        <ul>
                            {itemsTeamMatch &&
                                itemsTeamMatch.map((im) => 
                                    im?.attributes?.map((ima) => 
                                        ima?.name === 'holdable' &&
                                            <li>
                                                <span>
                                                    {im?.name.replace(/-/g, ' ')}
                                                </span>
                                            </li>
                                    
                                ))}
                        </ul>
                    </TeamAutocomplete>
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