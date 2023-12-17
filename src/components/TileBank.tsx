"use client";

import { useEffect } from "react";
import TileOption from "../components/TileOption";
import { useTileBankState } from "@/context/TileBankContext";

const TileBank = () => {
    const { tileBankState, resetTileBank } = useTileBankState();

    useEffect(() => {
        if (tileBankState.length === 0) {
            resetTileBank();
        }
    }, []);

    return (
        <div className="mt-8 flex items-center justify-center">
            <TileOption tile={tileBankState[0]} index={0} />
            <TileOption tile={tileBankState[1]} index={1} />
            <TileOption tile={tileBankState[2]} index={2} />
        </div>
    );
};

export default TileBank;
