"use client";

import { FunctionComponent, useState } from "react";
import Quadrant from "./Quadrant";
import { TileState } from "../utils/tileState";

const Board: FunctionComponent<{}> = () => {
    const [boardState, setBoardState] = useState(
        Array.from({ length: 9 }, () =>
            new Array(9).fill(TileState.Hover)
        ) as TileState[][]
    );
    return (
        <div className="flex justify-center items-center flex-col">
            {[0, 3, 6].map((row) => (
                <div className="flex">
                    {[0, 3, 6].map((col) => (
                        <Quadrant
                            quadrantState={[
                                boardState[0 + row].slice(0 + col, 3 + col),
                                boardState[1 + row].slice(0 + col, 3 + col),
                                boardState[2 + row].slice(0 + col, 3 + col),
                            ]}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
