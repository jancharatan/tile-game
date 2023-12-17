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
    let coords = [];
    for (let coord of tile) {
        let row = location[0] + coord[0];
        let col = location[1] + coord[1];
        coords.push([row, col]);
    }

    setBoardStateAtCoords(coords, TileState.Occupied);
    checkRowCompletion(boardState, setBoardStateAtCoords);
    checkColCompletion(boardState, setBoardStateAtCoords);
    checkQuadrantCompletion(boardState, setBoardStateAtCoords);
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

const checkColCompletion = (
    boardState: TileState[][],
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void
) => {
    for (let col = 0; col < boardState.length; col++) {
        let currentCol = Array.from(
            { length: boardState.length },
            (v, index) => boardState[index][col]
        );
        if (currentCol.every((value) => value === TileState.Occupied)) {
            setBoardStateAtCoords(
                Array.from({ length: boardState.length }, (v, index) => [
                    index,
                    col,
                ]),
                TileState.Empty
            );
        }
    }
};

const getQuadrantAt = (
    boardState: TileState[][],
    qRow: number,
    qCol: number
): { quadrantVals: TileState[]; quadrantCoords: number[][] } => {
    let quadrantVals = [];
    let quadrantCoords = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            quadrantVals.push(boardState[qRow + row][qCol + col]);
            quadrantCoords.push([qRow + row, qCol + col]);
        }
    }
    return { quadrantVals, quadrantCoords };
};

const checkQuadrantCompletion = (
    boardState: TileState[][],
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void
) => {
    for (let qRow = 0; qRow < boardState.length; qRow += 3) {
        for (let qCol = 0; qCol < boardState[qRow].length; qCol += 3) {
            let { quadrantVals, quadrantCoords } = getQuadrantAt(
                boardState,
                qRow,
                qCol
            );
            if (quadrantVals.every((val) => val === TileState.Occupied)) {
                setBoardStateAtCoords(quadrantCoords, TileState.Empty);
            }
        }
    }
};

export { canPlace, placeTile };
