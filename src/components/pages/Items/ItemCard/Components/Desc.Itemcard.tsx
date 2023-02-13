import { IItem } from '@/types/Items/Item';
import { removeDash } from '@/utils/Typography';
import {
  ItemCardDescSection,
  ItemCardDescTable,
  ItemCardDescTitle,
} from '../Styled.ItemCard';

type Props = {
  item?: IItem;
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
                <th>{removeDash(ift.version_group.name)}</th>
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
