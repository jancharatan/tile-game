"use client";

import { FunctionComponent } from "react";
import Board from "../components/Board";
import Score from "../components/Score";
import TileBank from "../components/TileBank";
import ContextProvider from "@/context/ContextProvider";

const Home: FunctionComponent<{}> = () => {
    return (
        <ContextProvider>
            <div className="p-10 flex flex-col items-center">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="w-48 mb-3 text-2xl font-semibold p-2">
                        Tile Game
                    </div>
                    <Score />
                    <button className="w-48 mb-3 text-2xl font-semibold border-black border-2 bg-white text-black p-1 rounded-md hover:text-white hover:bg-black hover:border-white">
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
