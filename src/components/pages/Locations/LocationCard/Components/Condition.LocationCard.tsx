import { Locations } from '@/types/types'
import React from 'react'

type Props = {
    ave: Locations.PokemonDetails;
}

function ConditionLocationCard({ ave }: Props) {
    return (
        <>
            {ave.condition_values.length !== 0 ? (
                <td>
                    {ave.condition_values?.map((avec) => (
                        <p key={avec.name}>
                            {avec.name.replace(/-/g, ` `)}
                        </p>
                    ))}
                </td>
            ) : (
                <td>-</td>
            )}
        </>
    )
}

export default ConditionLocationCard