"use client";

import TileOption from "../components/TileOption";
import { useTileBankState } from "@/context/TileBankContext";

const TileBank = () => {
    const tileBank = useTileBankState();

    return (
        <div className="mt-8 flex items-center justify-center">
            <TileOption tile={tileBank.tileBankState[0]} />
            <TileOption tile={tileBank.tileBankState[1]} />
            <TileOption tile={tileBank.tileBankState[2]} />
        </div>
    );
};

export default TileBank;
