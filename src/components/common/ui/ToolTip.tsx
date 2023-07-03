import { Tooltip as ReactTooltip } from 'react-tooltip';

type Props = {
  id: string;
};

const ToolTip = ({ id }: Props) => {
  return (
    <>
      <ReactTooltip style={{ fontSize: `1.3rem` }} id={id} />
    </>
  );
};

export default ToolTip;
