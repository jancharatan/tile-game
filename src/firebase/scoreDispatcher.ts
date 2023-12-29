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
    DocumentData,
} from "firebase/firestore";
import { LeaderboardContextType } from "@/context/LeaderboardContext";
import { Dispatch, SetStateAction } from "react";

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
    topScores: DocumentData[] | null,
    setTopScores: Dispatch<SetStateAction<DocumentData[] | null>>
) => {
    const auth = getAuth();
    const db = getFirestore();

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
