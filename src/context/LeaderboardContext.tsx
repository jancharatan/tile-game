import { DocumentData } from "firebase/firestore";
import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

type LeaderboardContextType = {
    topScores: DocumentData[] | null;
    setTopScores: Dispatch<SetStateAction<DocumentData[] | null>>;
};

const LeaderboardContext = createContext<LeaderboardContextType>({
    topScores: null,
    setTopScores: () => {},
});

export const useLeaderboardState = () => {
    return useContext(LeaderboardContext);
};

export const LeaderboardProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => {
    const [topScores, setTopScores] = useState<DocumentData[] | null>(null);

    const value = {
        topScores,
        setTopScores,
    };

    return (
        <LeaderboardContext.Provider value={value}>
            {children}
        </LeaderboardContext.Provider>
    );
};
