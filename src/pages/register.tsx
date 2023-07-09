import { ErrorToast, SuccessToast } from '@/components';
import { auth, db } from '@/firebase-config';
import styles from '@/modules/auth/Auth.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiX } from '@meronex/icons/fi';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (auth.currentUser) {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await setDoc(usersCollectionRef, {
          name: data.username,
          email: data.email,
          caught: [],
          balls: [
            { name: `pokeball`, number: 20 },
            { name: `superball`, number: 5 },
            { name: `hyperball`, number: 0 },
          ],
        });
        router.push(`/`);
        return <SuccessToast text="Congrats 🎉! Your account is now created" />;
      }
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
              <input
                type="text"
                id="username"
                placeholder="Username"
                {...register(`username`)}
              />
            </div>
            <div>
              <input
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
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`password`)}
              />
            </div>
            <div>
              <input
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
