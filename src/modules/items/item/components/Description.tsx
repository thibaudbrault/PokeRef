import { IItem } from '@/types';
import { removeDash } from '@/utils';

type Props = {
  item?: IItem;
};

export function Description({ item }: Props) {
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
