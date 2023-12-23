import { useBoardState } from "@/context/BoardStateContext";
import { TileState } from "./gameEnums";

const canPlace = (tile: number[][], location: number[]): boolean => {
    const { board } = useBoardState();
    for (let coords of tile) {
        let row = location[0] + coords[0];
        let col = location[1] + coords[1];
        if (board[row][col] === TileState.Occupied) {
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
    const rows = checkRowCompletion(boardState);
    const cols = checkColCompletion(boardState);
    const quadrants = checkQuadrantCompletion(boardState);
    for (let coords of rows.concat(cols).concat(quadrants)) {
        setBoardStateAtCoords(coords, TileState.Empty);
    }
};

const checkRowCompletion = (boardState: TileState[][]): number[][][] => {
    let rowsToRemove = [];
    for (let row = 0; row < boardState.length; row++) {
        if (boardState[row].every((value) => value === TileState.Occupied)) {
            rowsToRemove.push(
                Array.from({ length: boardState[row].length }, (v, index) => [
                    row,
                    index,
                ])
            );
        }
    }
    return rowsToRemove;
};

const checkColCompletion = (boardState: TileState[][]): number[][][] => {
    let colsToRemove = [];
    for (let col = 0; col < boardState.length; col++) {
        let currentCol = Array.from(
            { length: boardState.length },
            (v, index) => boardState[index][col]
        );
        if (currentCol.every((value) => value === TileState.Occupied)) {
            colsToRemove.push(
                Array.from({ length: boardState.length }, (v, index) => [
                    index,
                    col,
                ])
            );
        }
    }
    return colsToRemove;
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

const checkQuadrantCompletion = (boardState: TileState[][]): number[][][] => {
    let quadrantsToRemove = [];
    for (let qRow = 0; qRow < boardState.length; qRow += 3) {
        for (let qCol = 0; qCol < boardState[qRow].length; qCol += 3) {
            let { quadrantVals, quadrantCoords } = getQuadrantAt(
                boardState,
                qRow,
                qCol
            );
            if (quadrantVals.every((val) => val === TileState.Occupied)) {
                quadrantsToRemove.push(quadrantCoords);
            }
        }
    }
    return quadrantsToRemove;
};

const checkBoardOnHover = (
    boardOffsetLeft: number,
    boardOffsetTop: number,
    tileSize: number,
    x: number,
    y: number,
    board: TileState[][],
    tile: number[][]
) => {
    const closestXCoord = Math.round((x - boardOffsetLeft) / tileSize);
    const closestYCoord = Math.round((y - boardOffsetTop) / tileSize);
    for (let coord of tile) {
        let xTry = coord[0] + closestXCoord;
        let yTry = coord[1] + closestYCoord;
        if (xTry < 0 || xTry >= board.length) {
            return null;
        }
        if (yTry < 0 || yTry >= board.length) {
            return null;
        }
        if (board[xTry][yTry] === TileState.Occupied) {
            return null;
        }
    }
    return tile.map((coord) => [
        coord[0] + closestXCoord,
        coord[1] + closestYCoord,
    ]);
};

export { canPlace, placeTile, checkBoardOnHover };
