"use client";

import { useEffect } from "react";
import TileOption from "../components/TileOption";
import { useTileBankState } from "@/context/TileBankContext";
import { EMPTY_TILE_SLOT } from "@/utils/gameEnums";

const TileBank = () => {
    const { tileBank, resetTileBank } = useTileBankState();

    useEffect(() => {
        if (
            tileBank.length === 0 ||
            tileBank.every((tile) => tile === EMPTY_TILE_SLOT)
        ) {
            resetTileBank();
        }
    }, [tileBank]);

    return (
        <div className="flex items-center justify-center">
            {tileBank.length !== 0 && (
                <div className="flex flex-row">
                    <TileOption tile={tileBank[0]} index={0} />
                    <TileOption tile={tileBank[1]} index={1} />
                    <TileOption tile={tileBank[2]} index={2} />
                </div>
            )}
        </div>
    );
};

export default TileBank;
