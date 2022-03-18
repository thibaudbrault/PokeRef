import React from 'react';
import { Link } from 'react-router-dom';

function List({pokemon, species, game}) {
    return (
        <ul className='pokemon_data_container_list'>
            <li className='pokemon_data_container_list_desc'>
                {species?.flavor_text_entries?.map((sf) => 
                    sf?.language?.name === 'en' && sf?.version?.name === game && 
                        <>
                            {sf?.flavor_text?.replace('\u000c', ' ')}
                        </>
                )}
            </li>
            <li className='pokemon_data_container_list_types'>
                {pokemon?.types?.map((pt) => (
                    <div id={pt.type.name} className='pokemon_data_container_list_types_element'>
                        <img alt={pt.type.name} />
                        <Link
                            to={`types/${pt.type.name}`}
                        >
                            {pt.type.name}
                        </Link>
                    </div>
                ))}
            </li>
        </ul>
    )
}

export default List