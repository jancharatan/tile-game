import { FunctionComponent } from "react";
import Tile from "./Tile";
import { TileState } from "@/utils/tileState";

const Quadrant: FunctionComponent<{ quadrantState: TileState[][] }> = ({
    quadrantState,
}) => {
    return (
        <div className="flex flex-col">
            <div className="flex">
                <Tile tileState={quadrantState[0][0]} />
                <Tile tileState={quadrantState[0][0]} />
                <Tile tileState={quadrantState[0][0]} />
            </div>
            <div className="flex">
                <Tile tileState={quadrantState[0][0]} />
                <Tile tileState={quadrantState[0][0]} />
                <Tile tileState={quadrantState[0][0]} />
            </div>
            <div className="flex">
                <Tile tileState={quadrantState[0][0]} />
                <Tile tileState={quadrantState[0][0]} />
                <Tile tileState={quadrantState[0][0]} />
            </div>
        </div>
    );
};

export default Quadrant;
