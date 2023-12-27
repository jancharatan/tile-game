"use client";

import { FunctionComponent } from "react";
import Board from "../components/Board";
import TileBank from "../components/TileBank";
import ContextProvider from "@/context/ContextProvider";
import { useGameState } from "@/context/GameContext";

const Home: FunctionComponent<{}> = () => {
    const { score } = useGameState();
    return (
        <ContextProvider>
            <div className="p-10 flex flex-col items-center">
                <div className="w-full flex flex-row justify-between items-center mb-8">
                    <div className="w-28 md:w-36 text-lg md:text-xl font-semibold p-2">
                        Tile Game
                    </div>
                    <div className="flex text-white font-bold text-lg md:text-xl">
                        Score: {score}
                    </div>
                    <button className="w-28 md:w-36 text-lg md:text-xl font-semibold border-black border-2 bg-white text-black p-1 rounded-md hover:text-white hover:bg-black hover:border-white">
                        Donate
                    </button>
                </div>
                <Board />
                <TileBank />
            </div>
        </ContextProvider>
    );
};

export default Home;
