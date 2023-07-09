import { Loader } from '@/components';
import { Heading, List } from '@/modules/locations';
import { IRegion } from '@/types';
import { getRegions, regions } from '@/utils';
import * as Tabs from '@radix-ui/react-tabs';
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
      <Tabs.Root className="TabsRootMain" defaultValue={String(toggle)}>
        <RegionsMethod setToggle={setToggle} />
        <Tabs.Content value={String(toggle)}>
          <List location={location} locations={locations} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

export default LocationsPage;
