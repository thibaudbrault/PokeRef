import React from 'react'
import { Locations } from '@/types/types'

type Props = {
    ave: Locations.PokemonDetails;
}

function ChanceLocationCard({ ave }: Props) {
    return (
        <td>
            {ave.max_level === ave.min_level ? (
                <p>{ave.max_level}</p>
            ) : (
                <p>
                    {ave.min_level} - {ave.max_level}
                </p>
            )}
        </td>
    )
}

export default ChanceLocationCard