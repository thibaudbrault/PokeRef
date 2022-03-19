import React from 'react'

function Sprites({pokemon}) {
    return (
        <section className='pokemon_sprites'>
            <h3 className='pokemon_sprites_title'>Sprites</h3>
            <div className='pokemon_sprites_container'>
                <div className='pokemon_sprites_container_inner'>
                    <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
                    <p className='pokemon_sprites_container_inner_text'>Front Default</p>
                </div>
                <div className='pokemon_sprites_container_inner'>
                    <img src={pokemon?.sprites?.back_default} alt={pokemon?.name} />
                    <p className='pokemon_sprites_container_inner_text'>Back Default</p>
                </div>
                {pokemon?.sprites?.front_female !== null &&
                    <div className='pokemon_sprites_container_inner'>
                        <img src={pokemon?.sprites?.front_female} alt={pokemon?.name} />
                        <p className='pokemon_sprites_container_inner_text'>Front Female</p>
                    </div>
                }
                {pokemon?.sprites?.back_female !== null &&
                    <div className='pokemon_sprites_container_inner'>
                        <img src={pokemon?.sprites?.back_female} alt={pokemon?.name} />
                        <p className='pokemon_sprites_container_inner_text'>Back Female</p>
                    </div>
                }
                <div className='pokemon_sprites_container_inner'>
                    <img src={pokemon?.sprites?.front_shiny} alt={pokemon?.name} />
                    <p className='pokemon_sprites_container_inner_text'>Front Shiny</p>
                </div>
                <div className='pokemon_sprites_container_inner'>
                    <img src={pokemon?.sprites?.back_shiny} alt={pokemon?.name} />
                    <p className='pokemon_sprites_container_inner_text'>Back Shiny</p>
                </div>
                {pokemon?.sprites?.front_shiny_female !== null &&
                    <div className='pokemon_sprites_container_inner'>
                        <img src={pokemon?.sprites?.front_shiny_female} alt={pokemon?.name} />
                        <p className='pokemon_sprites_container_inner_text'>Front Shiny Female</p>
                    </div>
                }
                {pokemon?.sprites?.back_shiny_female !== null &&
                    <div className='pokemon_sprites_container_inner'>
                        <img src={pokemon?.sprites?.back_shiny_female} alt={pokemon?.name} />
                        <p className='pokemon_sprites_container_inner_text'>Back Shiny Female</p>
                    </div>
                }
            </div>
        </section>
    )
}

export default Sprites