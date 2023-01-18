import { useState, useEffect } from "react";
import { useLocation, useArea } from "@/hooks/DataFetch";

export const useSwitchGame = (name: string | string[] | undefined) => {
    const [game, setGame] = useState(`red`);
    const [toggleState, setToggleState] = useState(0);
    const {
        isLoading,
        error,
        data: location,
    } = useLocation(`https://pokeapi.co/api/v2/location/${name}`);

    const toggleTable = (index: number) => {
        setToggleState(index);
    };

    const areaUrl = location?.areas[toggleState]?.url;

    const { data: area } = useArea(areaUrl);

    const gameUsed = () => {
        switch (location?.region.name) {
            case `kanto`:
                setGame(`yellow`);
                break;
            case `johto`:
                setGame(`crystal`);
                break;
            case `hoenn`:
                setGame(`emerald`);
                break;
            case `sinnoh`:
                setGame(`platinum`);
                break;
            case `unova`:
                setGame(`black-2`);
                break;
            case `kalos`:
                setGame(`x`);
                break;
            case `alola`:
                setGame(`ultra-sun`);
                break;
        }
    };

    useEffect(() => {
        gameUsed();
    }, [location?.region.name]);

    return { game, setGame, isLoading, error, toggleState, toggleTable, location, area }
}