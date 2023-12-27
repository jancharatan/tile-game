"use client";

import Draggable from "react-draggable";
import { FunctionComponent, useState } from "react";
import { useInteractionState } from "@/context/InteractionContext";
import { checkCurrentDrag, placeTile } from "@/utils/gameLogic";
import { useBoardState } from "@/context/BoardStateContext";
import { tileSizes } from "@/tiles/tileSizes";
import { useTileBankState } from "@/context/TileBankContext";
import TileFactory from "@/tiles/TileFactory";
import { useGameState } from "@/context/GameContext";

const TileOption: FunctionComponent<{ tile: number; index: number }> = ({
    tile,
    index,
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState(1);
    const { board, hoveredTiles, setHoveredTiles, setBoardStateAtCoords } =
        useBoardState();
    const { boardOffsetLeft, boardOffsetTop, tileSize } = useInteractionState();
    const { emptyTile } = useTileBankState();
    const { increaseScore } = useGameState();

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
                    placeTile(
                        hoveredTiles,
                        board,
                        setBoardStateAtCoords,
                        increaseScore
                    );
                    if (hoveredTiles.length !== 0) {
                        emptyTile(index);
                    }
                    setHoveredTiles([]);
                    setPosition({ x: 0, y: 0 });
                    setSize(1);
                }}
                defaultClassName="oveflow-auto resize"
            >
                <div className="flex justify-center items-center w-52 h-52">
                    {tile !== -1 && (
                        <TileFactory size={20 * size} tiles={tileSizes[tile]} />
                    )}
                </div>
            </Draggable>
        </div>
    );
};

export default TileOption;
