import { tileSizes } from "@/tiles/tileSizes";
import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

const getRandomTile = (): number => {
    return Math.floor(Math.random() * Object.keys(tileSizes).length);
};

type TileBankContextType = {
    tileBank: number[];
    setTileBank: Dispatch<SetStateAction<number[]>>;
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
    const [tileBank, setTileBank] = useState<number[]>([]);

    const resetTileBank = (): void => {
        setTileBank([getRandomTile(), getRandomTile(), getRandomTile()]);
    };

    const emptyTile = (index: number): void => {
        setTileBank(tileBank.map((tile, i) => (i === index ? -1 : tile)));
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
