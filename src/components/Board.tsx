import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import Quadrant from "./Quadrant";
import { useBoardState } from "@/context/BoardStateContext";
import { useInteractionState } from "@/context/InteractionContext";
import { checkTilesUnplaceable } from "@/utils/gameLogic";
import { useTileBankState } from "@/context/TileBankContext";
import { useGameState } from "@/context/GameContext";
import { saveScore } from "@/firebase/scoreDispatcher";

const Board: FunctionComponent = ({}) => {
    const { board, clearBoard } = useBoardState();
    const { tileBank, resetTileBank } = useTileBankState();
    const { score, gameOver, setGameOver, resetScore } = useGameState();
    const { setBoardOffsetLeft, setBoardOffsetTop } = useInteractionState();
    const boardRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const setBoardOffset = () => {
        setBoardOffsetLeft(boardRef.current?.getBoundingClientRect().left || 0);
        setBoardOffsetTop(boardRef.current?.getBoundingClientRect().top || 0);
    };

    useEffect(() => {
        setBoardOffset();
        window.addEventListener("resize", () => setBoardOffset());
        window.addEventListener("scroll", () => setBoardOffset());
        if (checkTilesUnplaceable(board, tileBank)) {
            saveScore(score);
            setGameOver(true);
        }
    }, [tileBank]);

    const restartGame = () => {
        setGameOver(false);
        resetTileBank();
        clearBoard();
        resetScore();
    };

    return (
        <div
            ref={boardRef}
            className="flex justify-center items-center flex-col"
        >
            {gameOver && (
                <div className="absolute z-10 flex justify-center items-center flex-col">
                    <div className="text-black font-bold text-2xl drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)]">
                        Game Over
                    </div>
                    <button
                        onClick={() => restartGame()}
                        className="mt-1 w-24 mb-3 text-md border-black border-2 bg-white text-black p-1 rounded-md hover:text-white hover:bg-black hover:border-white"
                    >
                        Restart
                    </button>
                </div>
            )}
            {[0, 3, 6].map((row) => (
                <div
                    key={`board-row-${row / 3}`}
                    className={`flex ${gameOver && "blur-md"}`}
                >
                    {[0, 3, 6].map((col) => (
                        <Quadrant
                            key={`quadrant-row-${row / 3}-col-${col / 3}`}
                            quadrantState={[
                                board[0 + row].slice(0 + col, 3 + col),
                                board[1 + row].slice(0 + col, 3 + col),
                                board[2 + row].slice(0 + col, 3 + col),
                            ]}
                            quadrantRow={row / 3}
                            quadrantCol={col / 3}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
