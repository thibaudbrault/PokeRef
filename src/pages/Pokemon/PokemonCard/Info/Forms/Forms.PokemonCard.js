import React from 'react';
import { Link } from 'react-router-dom';
import { H3 } from '../../../../../components/BaseStyles/Headings';
import { TLink } from '../../../../../components/BaseStyles/Table';
import { PokemonInfoTable } from '../StyledInfo.PokemonCard';

function Forms({species}) {
    return (
        <div>
            <H3>Forms</H3>
            <PokemonInfoTable>
                <tbody>
                    <tr>
                        <th>
                            Alternative forms
                        </th>
                        <td>
                                {species?.forms_switchable === true ? (
                                    'Yes'
                                ) : (
                                    'No'
                                )}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Varieties
                        </th>
                        <td>
                            {species?.varieties?.map((sv) => (
                                <TLink
                                    to={`/pokemon/${sv?.pokemon?.name}`}
                                    key={sv?.pokemon?.name}
                                >
                                    {sv?.pokemon?.name?.replace(/-/g, ' ')}
                                </TLink>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Gender differences
                        </th>
                        <td>
                                {species?.has_gender_differences === true ? (
                                    'Yes'
                                ) : (
                                    'No'
                                )}
                        </td>
                    </tr>
                </tbody>
            </PokemonInfoTable>
        </div>
    )
}

export default Forms