import { FunctionComponent } from "react";
import Quadrant from "./Quadrant";
import { useBoardState } from "@/context/BoardStateContext";

const Board: FunctionComponent = ({}) => {
    const { board } = useBoardState();

    return (
        <div className="flex justify-center items-center flex-col">
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
