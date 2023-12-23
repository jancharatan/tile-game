import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import Quadrant from "./Quadrant";
import { useBoardState } from "@/context/BoardStateContext";
import { useInteractionState } from "@/context/InteractionContext";

const Board: FunctionComponent = ({}) => {
    const { board } = useBoardState();
    const { setBoardOffsetLeft, setBoardOffsetTop } = useInteractionState();
    const boardRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const setBoardOffset = () => {
        setBoardOffsetLeft(boardRef.current?.offsetLeft || 0);
        setBoardOffsetTop(boardRef.current?.offsetTop || 0);
    };

    useEffect(() => {
        setBoardOffset();
        window.addEventListener("resize", () => setBoardOffset());
    }, []);

    return (
        <div
            ref={boardRef}
            className="mt-8 flex justify-center items-center flex-col"
        >
            {[0, 3, 6].map((row) => (
                <div key={`board-row-${row / 3}`} className="flex ">
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
