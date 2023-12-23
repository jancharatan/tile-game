import { useBoardState } from "@/context/BoardStateContext";
import { TileState } from "../utils/gameEnums";
import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import { placeTile } from "@/utils/gameLogic";
import { useInteractionState } from "@/context/InteractionContext";

const Tile: FunctionComponent<{
    tileState: TileState;
    tileRow: number;
    tileCol: number;
}> = ({ tileState, tileRow, tileCol }) => {
    const { board, setBoardStateAtCoords } = useBoardState();
    const tileRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const { setTileSize } = useInteractionState();

    useEffect(() => {
        setTileSize(tileRef.current?.offsetHeight || 0);
    }, []);

    return (
        <div
            ref={tileRef}
            onClick={() => {
                placeTile(
                    [[0, 0]],
                    [tileRow, tileCol],
                    board,
                    setBoardStateAtCoords
                );
            }}
            className={`w-10 h-10 shadow-[inset_0_0_0.2pt_0.2pt_rgba(156,163,175,1)]
                ${tileState === TileState.Empty && `bg-white`}
                ${tileState === TileState.Occupied && `bg-blue-950`}
                ${tileState === TileState.Hover && `bg-gray-400`}`}
        />
    );
};

export default Tile;
