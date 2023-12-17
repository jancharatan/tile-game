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
    setBoard: Dispatch<SetStateAction<TileState[][]>>;
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void;
};

const BoardStateContext = createContext<BoardStateContextType>({
    board: [[]],
    setBoard: () => {},
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

    const setBoardStateAtCoords = (coords: number[][], setTo: TileState) => {
        for (let coord of coords) {
            board[coord[0]][coord[1]] = setTo;
        }
        setBoard([...board]);
    };

    const value = {
        board,
        setBoard,
        setBoardStateAtCoords,
    };

    return (
        <BoardStateContext.Provider value={value}>
            {children}
        </BoardStateContext.Provider>
    );
};
