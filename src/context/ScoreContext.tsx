import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

type ScoreContextType = {
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    resetScore: () => void;
    increaseScore: (index: number) => void;
};

const ScoreContext = createContext<ScoreContextType>({
    score: 0,
    setScore: () => {},
    resetScore: () => {},
    increaseScore: () => {},
});

export const useScoreState = () => {
    return useContext(ScoreContext);
};

export const ScoreProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [score, setScore] = useState<number>(0);

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
    };

    return (
        <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
    );
};
