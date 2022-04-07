import React from 'react';
import { Link } from 'react-router-dom';
import { MoveCardDataCategory, MoveCardDataTable, MoveCardDataType } from '../StyledData.MoveCard';

function Desc({ move, version, machine }) {

    const maxPp = move?.pp * 1.6;

    return (
        <MoveCardDataTable>
            <tbody>
                <tr>
                    <th>Type</th>
                    <td>
                        <MoveCardDataType id={move?.type?.name}>
                            <Link
                                to={`/types/${move?.type?.name}`}
                                key={move?.type?.name}
                            >
                                <img alt={move?.type?.name} />
                                <span>{move?.type?.name}</span>
                            </Link>
                        </MoveCardDataType>
                    </td>
                </tr>
                <tr>
                    <th>Category</th>
                    <td>
                        <MoveCardDataCategory id={move?.damage_class?.name}>
                            <img alt={move?.damage_class?.name} />
                            <span>{move?.damage_class?.name}</span>
                        </MoveCardDataCategory>
                    </td>
                </tr>
                {machine?.map((ma) => 
                    ma?.version_group?.name === version && ma?.move?.name === move?.name &&
                        <tr>
                            <th>Machine / Record</th>
                            <td>
                                <span>{ma?.item?.name.toUpperCase()}</span>
                            </td>
                        </tr>
                )}
                <tr>
                    <th>Power</th>
                    <td>
                        {move?.power !== null ? (
                            move?.power
                        ) : (
                            '-'
                        )}
                    </td>
                </tr>
                <tr>
                    <th>PP</th>
                    <td>{move?.pp} (max. {maxPp})</td>
                </tr>
                <tr>
                    <th>Accuracy</th>
                    <td>
                        {move?.accuracy !== null ? (
                            move?.accuracy
                        ) : (
                            '-'
                        )}
                    </td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{move?.meta?.ailment?.name?.replace('none', '-')}</td>
                </tr>
                <tr>
                    <th>Priority</th>
                    <td>{move?.priority}</td>
                </tr>
            </tbody>
        </MoveCardDataTable>
    )
}

export default Desc