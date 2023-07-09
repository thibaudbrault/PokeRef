import { toast } from 'react-hot-toast';

type Props = {
  error?: Error | null;
  text?: string;
};

export const ErrorToast = ({ error }: Props) => {
  return (
    <>
      {toast.error(
        error
          ? `Something went wrong: ${error.message}`
          : `Something went wrong`,
        {
          style: {
            fontSize: `1.7rem`,
          },
        },
      )}
    </>
  );
};

export const SuccessToast = ({ text }: Props) => {
  const toastText = text ?? `Done`;
  return (
    <>
      {toast.success(toastText, {
        style: {
          fontSize: `1.7rem`,
        },
      })}
    </>
  );
};
