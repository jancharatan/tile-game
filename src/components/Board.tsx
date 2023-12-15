import { FunctionComponent, useContext } from "react";
import Quadrant from "./Quadrant";
import { BoardContext } from "@/pages/Home";

const Board: FunctionComponent = ({}) => {
    const { boardState } = useContext(BoardContext);
    return (
        <div className="flex justify-center items-center flex-col">
            {[0, 3, 6].map((row) => (
                <div className="flex ">
                    {[0, 3, 6].map((col) => (
                        <Quadrant
                            quadrantState={[
                                boardState[0 + row].slice(0 + col, 3 + col),
                                boardState[1 + row].slice(0 + col, 3 + col),
                                boardState[2 + row].slice(0 + col, 3 + col),
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
