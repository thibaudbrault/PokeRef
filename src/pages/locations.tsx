import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingLocations from '@/components/pages/Locations/Heading';
import { LocationSection } from '@/components/pages/Locations/Styled.Locations';
import { IRegion } from '@/types/Locations/Region';
import { regions } from '@/utils/DataArrays';
import { getRegions } from '@/utils/DataFetch';
import {
  dehydrate,
  QueryClient,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ListLocations = dynamic(
  () => import(`@/components/pages/Locations/Components/List.Locations`),
);

const RegionsMethod = dynamic(() =>
  import(`@/utils/ObjectsMap`).then((res) => res.RegionsMethod),
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
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingLocations />
      <MainBig>
        <RegionsMethod toggle={toggle} setToggle={setToggle} />
        <ListLocations location={location} locations={locations} />
        {location === `galar` || location === `hisui` ? (
          <LocationSection>
            <p>
              No data for {location.charAt(0).toUpperCase() + location.slice(1)}
            </p>
          </LocationSection>
        ) : null}
      </MainBig>
    </>
  );
}

export default LocationsPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: [`regions`],
    queryFn: getRegions,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
