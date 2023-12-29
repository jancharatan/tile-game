"use client";

import { FunctionComponent, useState } from "react";
import Board from "../components/Board";
import TileBank from "../components/TileBank";
import ContextProvider from "@/context/ContextProvider";
import Score from "@/components/Score";
import { getAuth } from "firebase/auth";
import LogIn from "@/components/LogIn";

const Home: FunctionComponent<{}> = () => {
    const auth = getAuth();
    const [displayName, setDisplayName] = useState<string | null | undefined>(
        null
    );
    auth.onAuthStateChanged((user) => {
        if (user) {
            setDisplayName(auth.currentUser?.displayName);
        } else {
            setDisplayName(null);
        }
    });

    return (
        <ContextProvider>
            <div className="p-10 flex flex-col items-center">
                <div className="w-full flex flex-row justify-between items-center mb-8">
                    <div className="w-28 md:w-36 text-lg md:text-xl font-semibold p-2">
                        Tile Game
                    </div>
                    <Score displayName={displayName} />
                    <LogIn displayName={displayName} />
                </div>
                <Board />
                <TileBank />
            </div>
        </ContextProvider>
    );
};

export default Home;
