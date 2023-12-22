"use client";

import Draggable from "react-draggable";
import Plus from "@/tiles/plus";
import { TileList } from "@/utils/gameEnums";
import { FunctionComponent, useState } from "react";

const TileOption: FunctionComponent<{ tile: TileList; index: number }> = ({
    tile,
    index,
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState(1);

    return (
        <div className="flex h-full w-full justify-center items-center ml-5 mr-5">
            <Draggable
                position={position}
                defaultPosition={{ x: 0, y: 0 }}
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
                    <Plus size={60 * size} />
                </div>
            </Draggable>
        </div>
    );
};

export default TileOption;
