import { useGameState } from "@/context/GameContext";

const Score = () => {
    const { score } = useGameState();
    return (
        <div className="flex w-28 h-8 bg-white text-black items-center justify-center font-bold rounded-md">
            Score ={">"} {score}
        </div>
    );
};

export default Score;
