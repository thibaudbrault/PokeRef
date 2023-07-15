import { type Dispatch, type SetStateAction } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FiX } from '@meronex/icons/fi';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import * as yup from 'yup';

import { ErrorToast, Input, SuccessToast, errorToast } from '@/components';
import { capitalize } from '@/utils';

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
      return <SuccessToast text="Check your mails ✉" />;
    } catch (error) {
      if (error instanceof Error) {
        errorToast(error.message);
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
            <Input
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
