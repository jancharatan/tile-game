"use client";

import { useEffect } from "react";
import TileOption from "../components/TileOption";
import { useTileBankState } from "@/context/TileBankContext";

const TileBank = () => {
    const tileBank = useTileBankState();

    useEffect(() => {
        if (tileBank.tileBankState.length === 0) {
            tileBank.resetTileBank();
        }
    }, []);

    return (
        <div className="mt-8 flex items-center justify-center">
            <TileOption tile={tileBank.tileBankState[0]} />
            <TileOption tile={tileBank.tileBankState[1]} />
            <TileOption tile={tileBank.tileBankState[2]} />
        </div>
    );
};

export default TileBank;
