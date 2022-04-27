import React from 'react';
import { Link } from 'react-router-dom';

import { Table, THead, TName, TRow } from '../../../components/BaseStyles/Table';
import { ModifiedLeftTitle, MovesSection, StatusMoves } from '../StyledMoves';

function StatusTable({status, toggleState}) {
    return (
        <MovesSection visibility={toggleState === 2}>
            <ModifiedLeftTitle>Status</ModifiedLeftTitle>
            <Table>
                <THead>
                    <tr>
                        <th>Status</th>
                        <th>Moves</th>
                    </tr>
                </THead>
                <tbody>
                    {status
                        .filter((s) => s.name !== 'none')
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((s) => (
                            <TRow>
                                <TName>{s.name.replace(/-/g, ' ')}</TName>
                                <StatusMoves>
                                    {s.moves.map((sm) => (
                                        <Link to={`/moves/${sm.name}`}>
                                            <p>{sm.name.replace(/-/g, ' ')}</p>
                                        </Link>
                                    ))}
                                </StatusMoves>
                            </TRow>
                        ))}
                </tbody>
            </Table>
        </MovesSection>
    )
}

export default StatusTable