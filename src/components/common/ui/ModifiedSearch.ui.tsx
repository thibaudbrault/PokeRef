import { Dispatch, SetStateAction } from 'react';
import { Input, ModifiedSearch } from '../styles/Inputs';

type Props = {
  placeholder: string;
  setSearch: Dispatch<SetStateAction<string | null>>;
};

function ModifiedSearchUi({ placeholder, setSearch }: Props) {
  return (
    <ModifiedSearch>
      <Input>
        <label htmlFor="searchBar">Search</label>
        <input
          type="text"
          placeholder={placeholder}
          name="searchBar"
          id="searchBar"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Input>
    </ModifiedSearch>
  );
}

export default ModifiedSearchUi;
