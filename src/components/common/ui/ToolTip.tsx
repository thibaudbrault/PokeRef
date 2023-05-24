import { StyledTooltip } from '../styles/Headings';

type Props = {
  id: string;
};

const ToolTip = ({ id }: Props) => {
  return (
    <>
      <StyledTooltip id={id} />
    </>
  );
};

export default ToolTip;
