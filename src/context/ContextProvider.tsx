import { FunctionComponent } from "react";
import { BoardStateProvider } from "./BoardStateContext";
import { InteractionProvider } from "./InteractionContext";
import { ScoreProvider } from "./ScoreContext";
import { TileBankProvider } from "./TileBankContext";

const ContextProvider: FunctionComponent<{
    children: any;
}> = ({ children }) => (
    <InteractionProvider>
        <BoardStateProvider>
            <TileBankProvider>
                <ScoreProvider>{children}</ScoreProvider>
            </TileBankProvider>
        </BoardStateProvider>
    </InteractionProvider>
);

export default ContextProvider;
