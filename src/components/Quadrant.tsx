import React, { FunctionComponent } from "react";
import Tile from "./Tile";
import { TileState } from "@/utils/gameEnums";

const Quadrant: FunctionComponent<{
    quadrantState: TileState[][];
    quadrantRow: number;
    quadrantCol: number;
}> = ({ quadrantState, quadrantRow, quadrantCol }) => {
    return (
        <div
            className={`flex flex-col border-t-4 border-l-4 border-gray-400 
            ${quadrantCol == 2 && `border-r-4`} 
            ${quadrantRow == 2 && `border-b-4`}`}
        >
            {[0, 1, 2].map((row) => (
                <div className="flex" key={`row-${row}`}>
                    {[0, 1, 2].map((col) => (
                        <Tile
                            key={`tile-col-${col}`}
                            tileState={quadrantState[row][col]}
                            tileRow={quadrantRow * 3 + row}
                            tileCol={quadrantCol * 3 + col}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Quadrant;
