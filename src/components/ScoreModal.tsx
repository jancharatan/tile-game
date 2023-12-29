import { useLeaderboardState } from "@/context/LeaderboardContext";
import { getScores } from "@/firebase/scoreDispatcher";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

const ScoreModal: FunctionComponent<{
    setShowScoreModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowScoreModal }) => {
    const { topScores, setTopScores } = useLeaderboardState();
    const scores = getScores(topScores, setTopScores);
    return (
        <div className="absolute bg-white inset-0 mx-auto my-auto h-3/4 w-2/4 z-10 p-4 rounded-md">
            <div className="flex flex-row justify-between text-black text-lg md:text-xl font-semibold">
                <div>Top Scores</div>
                <button onClick={() => setShowScoreModal(false)}>X</button>
            </div>
            <div>
                {scores ? (
                    scores.map((scoreEntry) => (
                        <div
                            className="text-black text-lg grid grid-cols-[200px_100px_minmax(300px,_1fr)]"
                            key={`${scoreEntry.displayName}, ${
                                scoreEntry.score
                            }, ${scoreEntry.timestamp.seconds * 1000}`}
                        >
                            <div>{scoreEntry.displayName}</div>
                            <div>{scoreEntry.score}</div>
                            <div>
                                {new Date(
                                    scoreEntry.timestamp.seconds * 1000
                                ).toUTCString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <div> No scores found {":("}</div>
                )}
            </div>
        </div>
    );
};

export default ScoreModal;
