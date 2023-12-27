import Tile from "@/components/Tile";
import { TileState } from "@/utils/gameEnums";
import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

type BoardStateContextType = {
    board: TileState[][];
    hoveredTiles: number[][];
    setBoard: Dispatch<SetStateAction<TileState[][]>>;
    clearBoard: () => void;
    setHoveredTiles: Dispatch<SetStateAction<number[][]>>;
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void;
};

const BoardStateContext = createContext<BoardStateContextType>({
    board: [[]],
    hoveredTiles: [],
    setBoard: () => {},
    clearBoard: () => {},
    setHoveredTiles: () => {},
    setBoardStateAtCoords: () => {},
});

export const useBoardState = () => {
    return useContext(BoardStateContext);
};

export const BoardStateProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [board, setBoard] = useState<TileState[][]>(
        Array.from({ length: 9 }, () =>
            new Array(9).fill(TileState.Empty)
        ) as TileState[][]
    );
    const [hoveredTiles, setHoveredTiles] = useState<number[][]>([]);

    const clearBoard = () => {
        setBoard(
            Array.from({ length: 9 }, () =>
                new Array(9).fill(TileState.Empty)
            ) as TileState[][]
        );
    };

    const setBoardStateAtCoords = (coords: number[][], setTo: TileState) => {
        for (let coord of coords) {
            board[coord[0]][coord[1]] = setTo;
        }
        setBoard([...board]);
    };

    const value = {
        board,
        hoveredTiles,
        setBoard,
        clearBoard,
        setHoveredTiles,
        setBoardStateAtCoords,
    };

    return (
        <BoardStateContext.Provider value={value}>
            {children}
        </BoardStateContext.Provider>
    );
};
