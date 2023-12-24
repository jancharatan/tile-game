"use client";

import Draggable from "react-draggable";
import { TileList } from "@/utils/gameEnums";
import { FunctionComponent, useState } from "react";
import { useInteractionState } from "@/context/InteractionContext";
import { checkCurrentDrag, placeTile } from "@/utils/gameLogic";
import { useBoardState } from "@/context/BoardStateContext";
import { tileSizes } from "@/utils/tileSizes";
import { useTileBankState } from "@/context/TileBankContext";
import { Dot, Plus, TwoUp } from "@/tiles";

const TileOption: FunctionComponent<{ tile: TileList; index: number }> = ({
    tile,
    index,
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState(1);
    const { board, hoveredTiles, setHoveredTiles, setBoardStateAtCoords } =
        useBoardState();
    const { boardOffsetLeft, boardOffsetTop, tileSize } = useInteractionState();
    const { emptyTile } = useTileBankState();

    const tilesToModify = (e: MouseEvent) => {
        return checkCurrentDrag(
            boardOffsetLeft,
            boardOffsetTop,
            tileSize,
            e.clientX - e.offsetX,
            e.clientY - e.offsetY,
            board,
            tileSizes[tile]
        );
    };

    return (
        <div className="flex h-full w-full justify-center items-center">
            <Draggable
                position={position}
                defaultPosition={{ x: 0, y: 0 }}
                // @ts-ignore
                onDrag={(e: MouseEvent) => {
                    const hoveredTiles = tilesToModify(e);
                    setHoveredTiles(hoveredTiles);
                }}
                onStart={() => {
                    setSize(2);
                }}
                onStop={() => {
                    placeTile(hoveredTiles, board, setBoardStateAtCoords);
                    if (hoveredTiles.length !== 0) {
                        emptyTile(index);
                    }
                    setHoveredTiles([]);
                    setPosition({ x: 0, y: 0 });
                    setSize(1);
                }}
                defaultClassName="oveflow-auto resize"
            >
                <div className="flex justify-center items-center w-36 h-36">
                    {tile === TileList.Plus && <Plus size={20 * size} />}
                    {tile === TileList.Dot && <Dot size={20 * size} />}
                    {tile === TileList.TwoUp && <TwoUp size={20 * size} />}
                </div>
            </Draggable>
        </div>
    );
};

export default TileOption;
