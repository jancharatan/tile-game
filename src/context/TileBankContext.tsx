import { TileList } from "@/utils/gameEnums";
import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
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
    emptyTile: (index: number) => void;
};

const TileBankContext = createContext<TileBankContextType>({
    tileBankState: [],
    setTileBankState: () => {},
    resetTileBank: () => {},
    emptyTile: () => {},
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

    const emptyTile = (index: number): void => {
        console.log("Emptying", index);
        setTileBankState(
            tileBankState.map((tile, i) =>
                i === index ? TileList.Empty : tile
            )
        );
    };

    const value = {
        tileBankState,
        setTileBankState,
        resetTileBank,
        emptyTile,
    };

    return (
        <TileBankContext.Provider value={value}>
            {children}
        </TileBankContext.Provider>
    );
};
