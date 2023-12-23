import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

type InteractionContextType = {
    boardOffsetLeft: number;
    boardOffsetTop: number;
    tileSize: number;
    setBoardOffsetLeft: Dispatch<SetStateAction<number>>;
    setBoardOffsetTop: Dispatch<SetStateAction<number>>;
    setTileSize: Dispatch<SetStateAction<number>>;
};

const InteractionContext = createContext<InteractionContextType>({
    boardOffsetLeft: 0,
    boardOffsetTop: 0,
    tileSize: 0,
    setBoardOffsetLeft: () => {},
    setBoardOffsetTop: () => {},
    setTileSize: () => {},
});

export const useInteractionState = () => {
    return useContext(InteractionContext);
};

export const InteractionProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [boardOffsetLeft, setBoardOffsetLeft] = useState<number>(0);
    const [boardOffsetTop, setBoardOffsetTop] = useState<number>(0);
    const [tileSize, setTileSize] = useState<number>(0);

    const value = {
        boardOffsetLeft,
        boardOffsetTop,
        tileSize,
        setBoardOffsetLeft,
        setBoardOffsetTop,
        setTileSize,
    };

    return (
        <InteractionContext.Provider value={value}>
            {children}
        </InteractionContext.Provider>
    );
};
