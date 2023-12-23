"use client";

import Draggable from "react-draggable";
import Plus from "@/tiles/Plus";
import { TileList, TileState } from "@/utils/gameEnums";
import { FunctionComponent, useState } from "react";
import { useInteractionState } from "@/context/InteractionContext";
import { checkBoardOnHover } from "@/utils/gameLogic";
import { useBoardState } from "@/context/BoardStateContext";
import { tileSizes } from "@/utils/tileSizes";

const TileOption: FunctionComponent<{ tile: TileList; index: number }> = ({
    tile,
    index,
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState(1);
    const { board, setHoveredTiles } = useBoardState();
    const { boardOffsetLeft, boardOffsetTop, tileSize } = useInteractionState();

    return (
        <div className="flex h-full w-full justify-center items-center">
            <Draggable
                position={position}
                defaultPosition={{ x: 0, y: 0 }}
                // @ts-ignore
                onDrag={(e: MouseEvent) => {
                    const hoveredTiles = checkBoardOnHover(
                        boardOffsetLeft,
                        boardOffsetTop,
                        tileSize,
                        e.clientX - e.offsetX,
                        e.clientY - e.offsetY,
                        board,
                        tileSizes[tile]
                    );
                    setHoveredTiles(hoveredTiles);
                }}
                onStart={() => {
                    setSize(2);
                }}
                onStop={() => {
                    setHoveredTiles([]);
                    setPosition({ x: 0, y: 0 });
                    setSize(1);
                }}
                defaultClassName="oveflow-auto resize"
            >
                <div className="flex justify-center items-center w-36 h-36">
                    {tile === TileList.Plus && <Plus size={60 * size} />}
                </div>
            </Draggable>
        </div>
    );
};

export default TileOption;
