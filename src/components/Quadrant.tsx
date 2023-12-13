import { FunctionComponent } from "react";
import Tile from "./Tile";
import { TileState } from "@/utils/tileState";

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
                <div className="flex">
                    {[0, 1, 2].map((col) => (
                        <Tile
                            tileState={quadrantState[row][col]}
                            tileRow={row}
                            tileCol={col}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Quadrant;
