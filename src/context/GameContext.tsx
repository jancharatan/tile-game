import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

type GameContextType = {
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    resetScore: () => void;
    increaseScore: (index: number) => void;
    gameOver: boolean;
    setGameOver: Dispatch<SetStateAction<boolean>>;
};

const GameContext = createContext<GameContextType>({
    score: 0,
    setScore: () => {},
    resetScore: () => {},
    increaseScore: () => {},
    gameOver: false,
    setGameOver: () => {},
});

export const useGameState = () => {
    return useContext(GameContext);
};

export const GameProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const resetScore = (): void => {
        setScore(0);
    };

    const increaseScore = (amount: number): void => {
        setScore(score + amount);
    };

    const value = {
        score,
        setScore,
        resetScore,
        increaseScore,
        gameOver,
        setGameOver,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
};
