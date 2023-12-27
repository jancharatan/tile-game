import { FunctionComponent } from "react";
import { BoardStateProvider } from "./BoardStateContext";
import { InteractionProvider } from "./InteractionContext";
import { GameProvider } from "./GameContext";
import { TileBankProvider } from "./TileBankContext";

const ContextProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => (
    <InteractionProvider>
        <BoardStateProvider>
            <TileBankProvider>
                <GameProvider>{children}</GameProvider>
            </TileBankProvider>
        </BoardStateProvider>
    </InteractionProvider>
);

export default ContextProvider;
