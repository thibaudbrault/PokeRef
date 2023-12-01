import { FaChevronLeft } from '@meronex/icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, errorToast, GenNav, Loader } from '@/components';
import { Area, Heading, useSwitchGame } from '@/modules/locations/location';
import styles from '@/modules/locations/Locations.module.scss';
import { removeDash } from '@/utils';

import type { ILocationArea } from '@/types';

function LocationCard() {
  const router = useRouter();
  const name = router.query.name as string;

  const {
    game,
    setGame,
    isLoading,
    isError,
    error,
    location,
    areas,
    encounter,
    method,
  } = useSwitchGame(name);

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      <main className="mainBig">
        <section className={styles.title}>
          <h2 className="title">
            {location &&
              removeDash(location?.name).replace(
                /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea/g,
                ``,
              )}
          </h2>
          <h4 className="subtitle">
            {game && `${location?.region.name} - ${removeDash(game)}`}
          </h4>
        </section>
        <GenNav game={game} setGame={setGame} />
        {areas.map((area: ILocationArea) => (
          <>
            <h3 className="h3">
              {removeDash(area.name)
                .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)
                .replace(/area/, ``)}
            </h3>
            <Area
              area={area}
              encounter={encounter}
              method={method}
              game={game}
            />
          </>
        ))}
        <Button intent="back" size="fit" asChild>
          <Link href="/locations">
            <FaChevronLeft />
            Back to Locations
          </Link>
        </Button>
      </main>
    </>
  );
}

export default LocationCard;
