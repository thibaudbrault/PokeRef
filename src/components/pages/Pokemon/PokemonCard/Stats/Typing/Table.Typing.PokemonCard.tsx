import { PokemonInfoTable } from '../../Info/Styled.Info.PokemonCard';

type Props = {
  target: string;
};

function Table({ target }: Props) {
  return (
    <PokemonInfoTable>
      <tbody>
        <tr>
          <th>0x damage {target}</th>
          <td></td>
        </tr>
        <tr>
          <th>1/4x damage {target}</th>
          <td></td>
        </tr>
        <tr>
          <th>1/2x damage {target}</th>
          <td></td>
        </tr>
        <tr>
          <th>1x damage {target}</th>
          <td></td>
        </tr>
        <tr>
          <th>2x damage {target}</th>
          <td></td>
        </tr>
        <tr>
          <th>4x damage {target}</th>
          <td></td>
        </tr>
      </tbody>
    </PokemonInfoTable>
  );
}

export default Table;
