import { auth } from '@/firebase-config';
import { capitalize } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiX } from '@meronex/icons/fi';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import * as yup from 'yup';
import styles from './Auth.module.scss';

type Props = {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const schema = yup.object({
  resetEmail: yup.string().email().required(),
});

type FormInput = yup.Asserts<typeof schema>;

function ResetPwd({ modalIsOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema),
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
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      preventScroll={true}
      closeTimeoutMS={500}
      shouldCloseOnOverlayClick={false}
    >
      <button className={styles.closeReset} onClick={closeModal}>
        <FiX />
      </button>
      <h2 className="h2">Reset your password</h2>
      <form className={styles.resetForm} onSubmit={handleSubmit(resetPwdForm)}>
        <div className={styles.resetInput}>
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
        </div>
        <button className={styles.button} type="submit">
          Reset
        </button>
      </form>
    </Modal>
  );
}

export default ResetPwd;