import { TileList } from "@/utils/gameEnums";
import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const getRandomTile = (): TileList => {
    return Object.values(TileList)[
        Math.floor(Math.random() * Object.keys(TileList).length)
    ];
};

type TileBankContextType = {
    tileBankState: TileList[];
    setTileBankState: Dispatch<SetStateAction<TileList[]>>;
    resetTileBank: () => void;
};

const TileBankContext = createContext<TileBankContextType>({
    tileBankState: [],
    setTileBankState: () => {},
    resetTileBank: () => {},
});

export function useTileBankState() {
    return useContext(TileBankContext);
}

export const TileBankProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [tileBankState, setTileBankState] = useState<TileList[]>([]);

    const resetTileBank = (): void => {
        setTileBankState([getRandomTile(), getRandomTile(), getRandomTile()]);
    };

    useEffect(() => {}, []);

    const value = {
        tileBankState,
        setTileBankState,
        resetTileBank,
    };

    return (
        <TileBankContext.Provider value={value}>
            {children}
        </TileBankContext.Provider>
    );
};
