import React from 'react';
import { Items } from '@/types/types';
import {
  ItemCardDescSection,
  ItemCardDescTitle,
  ItemCardDescTable,
} from '../Styled.ItemCard';

type Props = {
  item?: Items.Items;
};

function DescItemcard({ item }: Props) {
  return (
    <ItemCardDescSection>
      <ItemCardDescTitle>Game descriptions</ItemCardDescTitle>
      <ItemCardDescTable>
        <tbody>
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
        </tbody>
      </ItemCardDescTable>
    </ItemCardDescSection>
  );
}

export default DescItemcard;
