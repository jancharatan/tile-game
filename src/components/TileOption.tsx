"use client";

import Draggable from "react-draggable";
import Plus from "@/tiles/Plus";
import { TileList } from "@/utils/gameEnums";
import { FunctionComponent, useState } from "react";
import { useInteractionState } from "@/context/InteractionContext";

const TileOption: FunctionComponent<{ tile: TileList; index: number }> = ({
    tile,
    index,
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState(1);
    const { boardOffsetLeft, boardOffsetTop } = useInteractionState();
    console.log(boardOffsetLeft, boardOffsetTop);

    return (
        <div className="flex h-full w-full justify-center items-center">
            <Draggable
                position={position}
                defaultPosition={{ x: 0, y: 0 }}
                onDrag={(event, dragElement) => {
                    console.log(event);
                    console.log(dragElement.x, dragElement.y);
                }}
                onStart={() => {
                    setSize(2);
                }}
                onStop={() => {
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
