import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import * as Label from '@radix-ui/react-label';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Select, { type SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { v4 as uuidv4 } from 'uuid';

import { useMediaQuery } from '@/hooks';
import {
  IOptionsOffsetLimit,
  genNav,
  generationsOptions,
  removeDash,
} from '@/utils';

import styles from './Nav.module.scss';

type Props = {
  setGame: Dispatch<SetStateAction<string | null>>;
  setVersion: Dispatch<SetStateAction<string | null>>;
};

type GenDetails = {
  game: string;
  version: string;
};

export function GenNav({ setGame, setVersion }: Props) {
  const isBreakpoint = useMediaQuery(890);
  const [generation, setGeneration] = useState<IOptionsOffsetLimit>(
    generationsOptions[0],
  );
  const [details, setDetails] = useState<GenDetails | null>(null);
  const animatedComponents = makeAnimated();

  const getVersionAndGame = () => {
    const details = genNav.filter((g) => g.value === generation.value)[0]
      .details;
    const detailsOptions = details.map((gd) => gd);
    return detailsOptions;
  };

  const handleGenSelect = (option: SingleValue<IOptionsOffsetLimit>) => {
    if (option) {
      setGeneration(option);
    }
  };

  const handleGameSelect = (option: SingleValue<GenDetails>) => {
    if (option) {
      setDetails(option);
      setGame(option.game);
      setVersion(option.version);
    }
  };

  useEffect(() => {
    setDetails(getVersionAndGame()[0]);
  }, [generation]);

  return isBreakpoint ? (
    <section className={styles.genNav}>
      <div className={styles.dropdown}>
        <Label.Root htmlFor="generation">Generation</Label.Root>
        <Select
          key={generation?.value}
          name="generation"
          id="generation"
          value={generation}
          className="dropdown selectOptions"
          classNamePrefix="select"
          components={animatedComponents}
          options={generationsOptions}
          placeholder="Select"
          onChange={(option) => {
            handleGenSelect(option as IOptionsOffsetLimit);
          }}
        />
      </div>
      <div className={styles.dropdown}>
        <Label.Root>Game</Label.Root>
        <Select
          key={details?.game}
          name="game"
          id="game"
          value={details}
          className="dropdown selectOptions"
          classNamePrefix="select"
          components={animatedComponents}
          options={getVersionAndGame()}
          defaultValue={getVersionAndGame()[0]}
          getOptionLabel={(option) => option.game}
          getOptionValue={(option) => option.version}
          placeholder="Select"
          onChange={(option) => {
            handleGameSelect(option as GenDetails);
          }}
        />
      </div>
    </section>
  ) : (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        {genNav.map((g) => (
          <NavigationMenu.Item key={uuidv4()}>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              {g.label}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              {g.details.map((gd) => (
                <button
                  key={gd.game}
                  onClick={() => {
                    setGame(gd.game);
                    setVersion(gd.version);
                  }}
                >
                  {removeDash(gd.game)}
                </button>
              ))}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
}
