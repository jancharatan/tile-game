import { getAuth } from "firebase/auth";
import {
    Timestamp,
    getFirestore,
    collection,
    addDoc,
    orderBy,
    limit,
    query,
    getDocs,
} from "firebase/firestore";
import { LeaderboardContextType } from "@/context/LeaderboardContext";

export const saveScore = (score: number): boolean => {
    const auth = getAuth();
    const db = getFirestore();

    if (!auth.currentUser?.uid) {
        return false;
    }

    const scoresRef = collection(db, "scores");
    addDoc(scoresRef, {
        score: score,
        timestamp: Timestamp.now(),
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
    }).catch((error) => console.log(error));

    return true;
};

export const getScores = (
    useLeaderboardState: () => LeaderboardContextType
) => {
    const auth = getAuth();
    const db = getFirestore();
    const { topScores, setTopScores } = useLeaderboardState();

    if (!auth.currentUser?.uid) {
        return false;
    }

    if (topScores) {
        return topScores;
    }

    const scoresRef = query(
        query(collection(db, "scores"), orderBy("score", "desc")),
        limit(10)
    );

    getDocs(scoresRef).then((data) => {
        const scores = data.docs.map((scoreEntry) => scoreEntry.data());
        setTopScores(scores);
        return scores;
    });
};
