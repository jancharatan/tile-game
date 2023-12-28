import { useGameState } from "@/context/GameContext";

const Score = () => {
    const { score } = useGameState();
    return (
        <div className="flex text-white font-bold text-lg md:text-xl">
            Score: {score}
        </div>
    );
};

export default Score;
