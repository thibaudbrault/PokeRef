import { toast } from 'react-hot-toast';

export const errorToast = (error?: string, id?: string) => {
  return toast.error(error ? error : `Something went wrong`, {
    style: {
      fontSize: `1.7rem`,
    },
    id: id,
  });
};

export const successToast = (text: string) => {
  const toastText = text ?? `Done`;
  return toast.success(toastText, {
    style: {
      fontSize: `1.7rem`,
    },
  });
};
