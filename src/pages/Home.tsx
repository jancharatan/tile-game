"use client";

import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useState,
} from "react";
import Board from "../components/Board";
import TileBank from "../components/TileBank";
import { TileState } from "@/utils/gameEnums";

type BoardContextType = {
    boardState: TileState[][];
    setBoardState: Dispatch<SetStateAction<TileState[][]>>;
};

export const BoardContext = createContext<BoardContextType>({
    boardState: [[]],
    setBoardState: () => {},
});

type TileBankContextType = {
    tileBankState: Number[];
    setTileBankState: Dispatch<SetStateAction<Number[]>>;
};

export const TileBankContext = createContext<TileBankContextType>({
    tileBankState: [],
    setTileBankState: () => {},
});

const Home: FunctionComponent<{}> = () => {
    const [boardState, setBoardState] = useState<TileState[][]>(
        Array.from({ length: 9 }, () =>
            new Array(9).fill(TileState.Empty)
        ) as TileState[][]
    );
    const [tileBankState, setTileBankState] = useState<Number[]>([0, 1, 2]);

    return (
        <div className="p-10 flex flex-col items-center">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="w-48 mb-3 text-2xl font-semibold p-2">
                    Tile Game
                </div>
                <div>Score</div>
                <button className="w-48 mb-3 text-2xl font-semibold border-black border-2 bg-white text-black p-2 rounded-md hover:text-white hover:bg-black hover:border-white hover:border-2">
                    Donate
                </button>
            </div>
            <BoardContext.Provider value={{ boardState, setBoardState }}>
                <TileBankContext.Provider
                    value={{ tileBankState, setTileBankState }}
                >
                    <Board />
                </TileBankContext.Provider>
                <TileBank />
            </BoardContext.Provider>
        </div>
    );
};

export default Home;
