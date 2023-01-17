import React from 'react'
import { TRow, TName } from '@/components/common/styles/Table';
import { Locations } from '@/types/types'
import ChanceLocationCard from './Chance.LocationCard';
import ConditionLocationCard from './Condition.LocationCard';

type Props = {
    area?: Locations.Area;
    game: string;
}

function TableLocationCard({ area, game }: Props) {
    return (
        <>
            {area?.pokemon_encounters?.map((a) =>
                a.version_details?.map(
                    (av) =>
                        av.version.name === game &&
                        av.encounter_details?.map((ave) => (
                            <TRow key={a.pokemon.name}>
                                <TName>{a.pokemon.name.replace(/-/g, ` `)}</TName>
                                <td>{ave.method.name.replace(/-/g, ` `)}</td>
                                <td>{ave.chance} %</td>
                                <ChanceLocationCard ave={ave} />
                                <ConditionLocationCard ave={ave} />
                            </TRow>
                        )),
                ),
            )}
        </>
    )
}

export default TableLocationCard