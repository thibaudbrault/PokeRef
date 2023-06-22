import { auth } from '@/firebase-config';
import { capitalize } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiX } from '@meronex/icons/fi';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import {
  AuthBtn,
  AuthModal,
  AuthResetClose,
  AuthResetForm,
  AuthResetInput,
} from './Styled.Auth';

type Props = {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type FormInput = {
  resetEmail: string;
};

const schema = yup
  .object({
    resetEmail: yup.string().email().required(),
  })
  .required();

function ResetPwd({ modalIsOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetPwdForm = async (data: FormInput) => {
    try {
      await sendPasswordResetEmail(auth, data.resetEmail);
      toast.success(`Check your mails ✉`, {
        style: {
          fontSize: `1.7rem`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      }
    }
  };

  return (
    <AuthModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      preventScroll={true}
      closeTimeoutMS={500}
      shouldCloseOnOverlayClick={false}
    >
      <AuthResetClose onClick={closeModal}>
        <FiX />
      </AuthResetClose>
      <h2 className="h2">Reset your password</h2>
      <AuthResetForm onSubmit={handleSubmit(resetPwdForm)}>
        <AuthResetInput>
          <div>
            <input
              type="email"
              id="resetEmail"
              placeholder="Email"
              {...register(`resetEmail`)}
            />
            {typeof errors.resetEmail?.message === `string` && (
              <small>{capitalize(errors.resetEmail?.message)}</small>
            )}
          </div>
        </AuthResetInput>
        <AuthBtn type="submit">Reset</AuthBtn>
      </AuthResetForm>
    </AuthModal>
  );
}

export default ResetPwd;
