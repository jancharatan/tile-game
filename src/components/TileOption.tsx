"use client";

import { useTileBankState } from "@/context/TileBankContext";
import Plus from "@/tiles/Plus";
import { TileList } from "@/utils/gameEnums";
import { FunctionComponent } from "react";

const TileOption: FunctionComponent<{ tile: TileList; index: number }> = ({
    tile,
    index,
}) => {
    const tilebank = useTileBankState();
    return (
        <div className="flex h-32 w-32 justify-center items-center ml-5 mr-5">
            {tile === TileList.Plus && <Plus size={50} />}
        </div>
    );
};

export default TileOption;
