import { LinkButton, Loader, Separator } from '@/components';
import { Damage, Heading, useToggleTable } from '@/modules/types/type';
import styles from '@/modules/types/type/Type.module.scss';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import toast from 'react-hot-toast';

type Props = {
  name: string;
};

function TypeCard({ name }: Props) {
  const { type, isLoading, isError, error, toggle, setToggle, pageShown } =
    useToggleTable(name);

  if (isError) {
    return toast.error(`Something went wrong: ${error?.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      <main className="mainBig">
        <div className={styles.title}>
          <Image
            src={`/images/types/${name}.png`}
            alt=""
            width={96}
            height={96}
          />
          <h2 className="pageTitle">{type?.name}</h2>
        </div>
        <Damage type={type} />
        <Separator />
        <nav className="methodNav">
          <button
            className={toggle === 1 ? `button_active` : ``}
            onClick={() => setToggle(1)}
          >
            <p>Pokémon</p>
          </button>
          <button
            className={toggle === 2 ? `button_active` : ``}
            onClick={() => setToggle(2)}
          >
            <p>Moves</p>
          </button>
        </nav>
        {pageShown()}
        <LinkButton href="/types" className="back" title="Back to Types" icon />
      </main>
    </>
  );
}

export default TypeCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
