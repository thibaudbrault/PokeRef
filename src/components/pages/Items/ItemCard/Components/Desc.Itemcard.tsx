import { Items } from '@/types/types'
import React from 'react'

type Props = {
    item?: Items.Items;
}

function DescItemcard({ item }: Props) {
    return (
        <>
            {item?.flavor_text_entries?.map((ift) =>
                ift.language.name === `en` ? (
                    <tr key={ift.text}>
                        <th>{ift.version_group.name.replace(/-/g, ` `)}</th>
                        <td>{ift.text}</td>
                    </tr>
                ) : (
                    ``
                ),
            )}
        </>
    )
}

export default DescItemcard