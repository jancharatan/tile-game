import { useScoreState } from "@/context/ScoreContext";

const Score = () => {
    const { score } = useScoreState();
    return (
        <div className="flex w-28 h-8 bg-white text-black items-center justify-center font-bold rounded-md">
            Score ={">"} {score}
        </div>
    );
};

export default Score;
