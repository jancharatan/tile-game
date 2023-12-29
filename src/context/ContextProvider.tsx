import { FunctionComponent } from "react";
import { BoardStateProvider } from "./BoardStateContext";
import { InteractionProvider } from "./InteractionContext";
import { GameProvider } from "./GameContext";
import { TileBankProvider } from "./TileBankContext";
import { LeaderboardProvider } from "./LeaderboardContext";

const ContextProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => (
    <InteractionProvider>
        <BoardStateProvider>
            <TileBankProvider>
                <LeaderboardProvider>
                    <GameProvider>{children}</GameProvider>
                </LeaderboardProvider>
            </TileBankProvider>
        </BoardStateProvider>
    </InteractionProvider>
);

export default ContextProvider;
