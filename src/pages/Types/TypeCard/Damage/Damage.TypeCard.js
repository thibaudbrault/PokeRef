import React from 'react';
import { Subtitle } from '../../../../components/BaseStyles/Headings';
import { TypeDamageSection, TypeDamageTable } from '../StyledTypeCard';

function Damage({type}) {
    return (
        <TypeDamageSection>
            <div>
                <Subtitle>Attack</Subtitle>
                <TypeDamageTable>
                    <tr>
                        <th>No damage to</th>
                        {type?.damage_relations?.no_damage_to?.map((ndt) => (
                            <td id={ndt.name}>
                                <img alt={ndt.name} />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Half damage to</th>
                        {type?.damage_relations?.half_damage_to?.map((hdt) => (
                            <td id={hdt.name}>
                                <img alt={hdt.name} />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Double damage to</th>
                        {type?.damage_relations?.double_damage_to?.map((ddt) => (
                            <td id={ddt.name}>
                                <img alt={ddt.name} />
                            </td>
                        ))}
                    </tr>
                </TypeDamageTable>
            </div>
            <div>
                <Subtitle>Defense</Subtitle>
                <TypeDamageTable>
                    <tr>
                        <th>No damage from</th>
                        {type?.damage_relations?.no_damage_from?.map((ndf) => (
                            <td id={ndf.name}>
                                <img alt={ndf.name} />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Half damage from</th>
                        {type?.damage_relations?.half_damage_from?.map((hdf) => (
                            <td id={hdf.name}>
                                <img alt={hdf.name} />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Double damage from</th>
                        {type?.damage_relations?.double_damage_from?.map((ddf) => (
                            <td id={ddf.name}>
                                <img alt={ddf.name} />
                            </td>
                        ))}
                    </tr>
                </TypeDamageTable>
            </div>
        </TypeDamageSection>
    )
}

export default Damage