import { yupResolver } from '@hookform/resolvers/yup';
import { FiX } from '@meronex/icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorToast, Input, SuccessToast } from '@/components';
import styles from '@/modules/auth/Auth.module.scss';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  cpassword: yup
    .string()
    .oneOf([yup.ref(`password`)])
    .required(),
});

type FormInput = yup.Asserts<typeof schema>;

function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema),
  });

  const submitForm = async (data: FormInput) => {
    try {
      // will create the user and put the info in the db
      router.push(`/`);
      return <SuccessToast text="Congrats 🎉! Your account is now created" />;
    } catch (error) {
      if (error instanceof Error) {
        return <ErrorToast error={error} />;
      }
    }
  };

  return (
    <main className="mainForm">
      <div className={styles.container}>
        <Link className={styles.close} href={`/`}>
          <FiX />
        </Link>
        <div className={styles.image2} />
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.title}>
            <h2 className="h2">Register</h2>
            <p>Create teams and save your favorites pokémon</p>
          </div>
          <div className={styles.input}>
            <div>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                {...register(`username`)}
              />
            </div>
            <div>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                {...register(`email`)}
              />
              {typeof errors.email?.message === `string` && (
                <p>{errors.email?.message}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`password`)}
              />
            </div>
            <div>
              <Input
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                {...register(`cpassword`)}
              />
            </div>
            <button className={styles.button} type="submit">
              Register
            </button>
          </div>
          <p className={styles.switch}>
            Already have an account ? <Link href="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
