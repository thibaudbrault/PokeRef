import React from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import { LocationSection } from '@/components/pages/Locations/Styled.Locations';
import Loader from '@/components/common/ui/Loader/Loader';
import dynamic from 'next/dynamic';
import { useToggleLocation } from '../components/pages/Locations/Hooks/useToggleLocation';
import HeadingLocations from '@/components/pages/Locations/Heading';

const ListLocations = dynamic(
  () => import(`@/components/pages/Locations/Components/List.Locations`),
);
const RegionsMethod = dynamic(() =>
  import(`@/utils/ObjectsMap`).then((res) => res.RegionsMethod),
);

function LocationsPage() {
  const { isLoading, error, toggle, setToggle, location } = useToggleLocation();

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingLocations />
      <MainBig>
        <RegionsMethod toggle={toggle} setToggle={setToggle} />
        <ListLocations location={location} />
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
