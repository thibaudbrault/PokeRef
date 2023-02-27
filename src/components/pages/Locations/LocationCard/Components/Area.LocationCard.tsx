import { ILocation } from '@/types/Locations/Location';
import { removeDash } from '@/utils/Typography';
import { LocationNav, LocationNavContainer } from '../../Styled.Locations';

type Props = {
  location?: ILocation;
  toggleState: number;
  toggleTable: (index: number) => void;
};

function AreaLocationCard({ location, toggleState, toggleTable }: Props) {
  return (
    <LocationNavContainer>
      <LocationNav>
        {location?.areas?.map((la, i) => (
          <button
            key={la.name}
            className={toggleState === i ? `button_active` : ``}
            onClick={() => toggleTable(i)}
          >
            <p>
              {removeDash(la.name)
                .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)
                .replace(/area/, ``)}
            </p>
          </button>
        ))}
      </LocationNav>
      <span>There is no information about this area</span>
    </LocationNavContainer>
  );
}

export default AreaLocationCard;
