import { TileState } from "../utils/tileState";
import { FunctionComponent } from "react";

const Tile: FunctionComponent<{
    tileState: TileState;
    tileRow: number;
    tileCol: number;
}> = ({ tileState, tileRow, tileCol }) => {
    return (
        <div
            className={`relative h-10 w-10 md:h-12 md:w-12 lg:w-14 lg:h-14 border-gray-400
            ${tileRow !== 2 && `border-b`}
            ${tileCol !== 2 && `border-r`}
            ${tileState === TileState.Empty && `bg-white`}
            ${tileState === TileState.Occupied && `bg-blue-950`}
            ${tileState === TileState.Hover && `bg-gray-400`}`}
        />
    );
};

export default Tile;
