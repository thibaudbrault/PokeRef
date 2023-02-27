import { PokemonTypesTable } from '../Styled.Stats.PokemonCard';

type Props = {
  target: string;
};

function TableTyping({ target }: Props) {
  return (
    <PokemonTypesTable>
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
    </PokemonTypesTable>
  );
}

export default TableTyping;
