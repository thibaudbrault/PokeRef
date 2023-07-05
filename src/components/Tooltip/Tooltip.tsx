import { Tooltip as ReactTooltip } from 'react-tooltip';

type Props = {
  id: string;
};

export const Tooltip = ({ id }: Props) => {
  return (
    <>
      <ReactTooltip style={{ fontSize: `1.3rem` }} id={id} />
    </>
  );
};
