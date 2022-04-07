import React from 'react'
import { H3 } from '../../../../components/BaseStyles/Headings'
import { PokemonSpritesDiv, PokemonSpritesSection } from './StyledSprites.PokemonCard'

function Sprites({pokemon}) {
    return (
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
                {pokemon?.sprites?.front_female !== null &&
                    <div>
                        <img src={pokemon?.sprites?.front_female} alt={pokemon?.name} />
                        <p>Front Female</p>
                    </div>
                }
                {pokemon?.sprites?.back_female !== null &&
                    <div>
                        <img src={pokemon?.sprites?.back_female} alt={pokemon?.name} />
                        <p>Back Female</p>
                    </div>
                }
                <div>
                    <img src={pokemon?.sprites?.front_shiny} alt={pokemon?.name} />
                    <p>Front Shiny</p>
                </div>
                <div>
                    <img src={pokemon?.sprites?.back_shiny} alt={pokemon?.name} />
                    <p>Back Shiny</p>
                </div>
                {pokemon?.sprites?.front_shiny_female !== null &&
                    <div>
                        <img src={pokemon?.sprites?.front_shiny_female} alt={pokemon?.name} />
                        <p>Front Shiny Female</p>
                    </div>
                }
                {pokemon?.sprites?.back_shiny_female !== null &&
                    <div>
                        <img src={pokemon?.sprites?.back_shiny_female} alt={pokemon?.name} />
                        <p>Back Shiny Female</p>
                    </div>
                }
            </PokemonSpritesDiv>
        </PokemonSpritesSection>
    )
}

export default Sprites