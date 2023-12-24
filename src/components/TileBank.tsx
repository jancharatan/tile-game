"use client";

import { useEffect } from "react";
import TileOption from "../components/TileOption";
import { useTileBankState } from "@/context/TileBankContext";
import { TileList } from "@/utils/gameEnums";

const TileBank = () => {
    const { tileBank, resetTileBank } = useTileBankState();

    useEffect(() => {
        if (tileBank.every((tile) => tile === TileList.Empty)) {
            resetTileBank();
        }
    }, [tileBank]);

    return (
        <div className="flex items-center justify-center">
            <TileOption tile={tileBank[0]} index={0} />
            <TileOption tile={tileBank[1]} index={1} />
            <TileOption tile={tileBank[2]} index={2} />
        </div>
    );
};

export default TileBank;
