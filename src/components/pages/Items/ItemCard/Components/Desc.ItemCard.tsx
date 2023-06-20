import { IItem } from '@/types/Items/Item';
import { removeDash } from '@/utils/Typography';

type Props = {
  item?: IItem;
};

function DescItemCard({ item }: Props) {
  return (
    <section className="section">
      <h3 className="h3">Game descriptions</h3>
      <table className="descTable">
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
      </table>
    </section>
  );
}

export default DescItemCard;
