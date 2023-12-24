import { useBoardState } from "@/context/BoardStateContext";
import { TileState } from "../utils/gameEnums";
import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import { useInteractionState } from "@/context/InteractionContext";

const Tile: FunctionComponent<{
    tileState: TileState;
    tileRow: number;
    tileCol: number;
}> = ({ tileState, tileRow, tileCol }) => {
    const tileRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const { setTileSize } = useInteractionState();
    const { hoveredTiles } = useBoardState();

    useEffect(() => {
        setTileSize(tileRef.current?.offsetHeight || 0);
    }, []);

    return (
        <div
            ref={tileRef}
            className={`w-10 h-10 shadow-[inset_0_0_0.2pt_0.2pt_rgba(156,163,175,1)]
                ${
                    hoveredTiles.some((a) =>
                        [tileRow, tileCol].every((v, i) => v === a[i])
                    ) && `!bg-gray-400`
                }
                ${tileState === TileState.Empty && `bg-white`}
                ${tileState === TileState.Occupied && `bg-blue-950`}`}
        />
    );
};

export default Tile;
