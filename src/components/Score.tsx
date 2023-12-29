import { useGameState } from "@/context/GameContext";
import { LeaderboardIcon } from "@/utils/Icons";
import { FunctionComponent, useState } from "react";
import ScoreModal from "./ScoreModal";

const Score: FunctionComponent<{ displayName: string | null | undefined }> = ({
    displayName,
}) => {
    const [showScoreModal, setShowScoreModal] = useState(false);
    const { score } = useGameState();
    return (
        <div className="flex flex-row items-center justify-center">
            {showScoreModal && (
                <ScoreModal setShowScoreModal={setShowScoreModal} />
            )}
            <div className="font-bold text-lg md:text-xl">Score: {score}</div>
            {displayName && (
                <div className="ml-2" onClick={() => setShowScoreModal(true)}>
                    <LeaderboardIcon size={20} />
                </div>
            )}
        </div>
    );
};

export default Score;
