import { zodResolver } from '@hookform/resolvers/zod';
import { FiX } from '@meronex/icons/fi';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input, Spinner, errorToast, successToast } from '@/components';
import styles from '@/modules/auth/Auth.module.scss';
import { RegisterValidator } from '@/utils';

type RegisterCredentials = z.infer<typeof RegisterValidator>;

function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterValidator),
  });

  const { mutate: registerHandler, isLoading } = useMutation({
    mutationFn: async (values: RegisterCredentials) => {
      try {
        const { confirmPassword, ...body } = values;
        const { data } = await axios.post(`/api/user/signup`, body);
        router.push(`/`);
        successToast(data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          errorToast(error.response?.data.message);
        }
      }
    },
  });

  return (
    <main className="mainForm">
      <div className={styles.container}>
        <Link className={styles.close} href={`/`}>
          <FiX />
        </Link>
        <div className={styles.image2} />
        <form
          className={styles.form}
          onSubmit={handleSubmit((values) => registerHandler(values))}
        >
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
                {...register(`name`)}
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
                <small>{errors.email?.message}</small>
              )}
            </div>
            <div>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`password`)}
              />
              {typeof errors.password?.message === `string` && (
                <small>{errors.password?.message}</small>
              )}
            </div>
            <div>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register(`confirmPassword`)}
              />
              {typeof errors.confirmPassword?.message === `string` && (
                <small>{errors.confirmPassword?.message}</small>
              )}
            </div>
            <button className={styles.button} type="submit">
              {isLoading ? <Spinner /> : `Register`}
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
