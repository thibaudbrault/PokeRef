import Loader from '@/components/common/ui/Loader/Loader';
import styles from '@/modules/locations/Locations.module.scss';
import { Heading, List } from '@/modules/locations';
import { IRegion } from '@/types';
import { capitalize, getRegions, regions } from '@/utils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const RegionsMethod = dynamic(() =>
  import(`@/utils`).then((res) => res.RegionsMethod),
);

function LocationsPage() {
  const [location, setLocation] = useState<string | null>(null);
  const [toggle, setToggle] = useState<number>(0);
  const {
    isLoading,
    isError,
    error,
    data: locations,
  }: UseQueryResult<IRegion[], Error> = useQuery({
    queryKey: [`regions`],
    queryFn: getRegions,
  });

  useEffect(() => {
    setLocation(regions[toggle + 1]);
  }, [toggle]);

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`, {
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
      <Heading />
      <main className="mainBig">
        <RegionsMethod toggle={toggle} setToggle={setToggle} />
        <List location={location} locations={locations} />
        {location === `galar` || location === `hisui` ? (
          <section className={styles.section}>
            <p>No data for {capitalize(location)}</p>
          </section>
        ) : null}
      </main>
    </>
  );
}

export default LocationsPage;
