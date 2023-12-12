import { TileState } from "../utils/tileState";
import { FunctionComponent } from "react";

const Tile: FunctionComponent<{ tileState: TileState }> = ({ tileState }) => {
    return (
        <div
            className={`relative w-16 h-16 border-2 border-black 
            ${tileState === TileState.Empty && `bg-white`}
            ${tileState === TileState.Occupied && `bg-black`}
            ${tileState === TileState.Hover && `bg-gray-300`}`}
        />
    );
};

export default Tile;