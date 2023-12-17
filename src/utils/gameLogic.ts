import { useBoardState } from "@/context/BoardStateContext";
import { TileState } from "./gameEnums";

const canPlace = (tile: number[][], location: number[]): boolean => {
    const { boardState } = useBoardState();
    for (let coords of tile) {
        let row = location[0] + coords[0];
        let col = location[1] + coords[1];
        if (boardState[row][col] === TileState.Occupied) {
            return false;
        }
    }
    return true;
};

const placeTile = (
    tile: number[][],
    location: number[],
    boardState: TileState[][],
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void
): void => {
    console.log("PLACING");

    let coords = [];
    for (let coord of tile) {
        let row = location[0] + coord[0];
        let col = location[1] + coord[1];
        coords.push([row, col]);
    }

    console.log(coords);

    setBoardStateAtCoords(coords, TileState.Occupied);
    checkRowCompletion(boardState, setBoardStateAtCoords);
};

const checkRowCompletion = (
    boardState: TileState[][],
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void
) => {
    for (let row = 0; row < boardState.length; row++) {
        if (boardState[row].every((value) => value === TileState.Occupied)) {
            setBoardStateAtCoords(
                Array.from({ length: boardState[row].length }, (v, index) => [
                    row,
                    index,
                ]),
                TileState.Empty
            );
        }
    }
};

export { canPlace, placeTile, checkRowCompletion };
