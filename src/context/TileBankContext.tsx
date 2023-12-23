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
    const { [TileList.Empty]: _, ...NoEmptyTileList } = TileList;
    return Object.values(NoEmptyTileList)[
        Math.floor(Math.random() * Object.keys(NoEmptyTileList).length)
    ];
};

type TileBankContextType = {
    tileBank: TileList[];
    setTileBank: Dispatch<SetStateAction<TileList[]>>;
    resetTileBank: () => void;
    emptyTile: (index: number) => void;
};

const TileBankContext = createContext<TileBankContextType>({
    tileBank: [],
    setTileBank: () => {},
    resetTileBank: () => {},
    emptyTile: () => {},
});

export function useTileBankState() {
    return useContext(TileBankContext);
}

export const TileBankProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [tileBank, setTileBank] = useState<TileList[]>([]);

    const resetTileBank = (): void => {
        setTileBank([getRandomTile(), getRandomTile(), getRandomTile()]);
    };

    const emptyTile = (index: number): void => {
        setTileBank(
            tileBank.map((tile, i) => (i === index ? TileList.Empty : tile))
        );
    };

    const value = {
        tileBank,
        setTileBank,
        resetTileBank,
        emptyTile,
    };

    return (
        <TileBankContext.Provider value={value}>
            {children}
        </TileBankContext.Provider>
    );
};
