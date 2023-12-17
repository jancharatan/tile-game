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
    boardState: TileState[][];
    setBoardState: Dispatch<SetStateAction<TileState[][]>>;
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void;
};

const BoardStateContext = createContext<BoardStateContextType>({
    boardState: [[]],
    setBoardState: () => {},
    setBoardStateAtCoords: () => {},
});

export const useBoardState = () => {
    return useContext(BoardStateContext);
};

export const BoardStateProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [boardState, setBoardState] = useState<TileState[][]>(
        Array.from({ length: 9 }, () =>
            new Array(9).fill(TileState.Empty)
        ) as TileState[][]
    );

    const setBoardStateAtCoords = (coords: number[][], setTo: TileState) => {
        for (let coord of coords) {
            boardState[coord[0]][coord[1]] = setTo;
        }
        setBoardState([...boardState]);
    };

    const value = {
        boardState,
        setBoardState,
        setBoardStateAtCoords,
    };

    return (
        <BoardStateContext.Provider value={value}>
            {children}
        </BoardStateContext.Provider>
    );
};
