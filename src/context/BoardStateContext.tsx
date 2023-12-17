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
};

const BoardStateContext = createContext<BoardStateContextType>({
    boardState: [[]],
    setBoardState: () => {},
});

export function useBoardState() {
    return useContext(BoardStateContext);
}

export const BoardStateProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [boardState, setBoardState] = useState<TileState[][]>(
        Array.from({ length: 9 }, () =>
            new Array(9).fill(TileState.Empty)
        ) as TileState[][]
    );

    const value = {
        boardState,
        setBoardState,
    };

    return (
        <BoardStateContext.Provider value={value}>
            {children}
        </BoardStateContext.Provider>
    );
};
