import { TileState } from "./gameEnums";
import { tileSizes } from "@/tiles/tileSizes";
import { EMPTY_TILE_SLOT } from "@/utils/gameEnums";

const canPlace = (
    board: TileState[][],
    tile: number[][],
    location: number[]
): boolean => {
    for (let coords of tile) {
        let row = location[0] + coords[0];
        let col = location[1] + coords[1];

        if (row < 0 || row >= board.length) {
            return false;
        }

        if (col < 0 || col >= board.length) {
            return false;
        }

        if (board[row][col] === TileState.Occupied) {
            return false;
        }
    }
    return true;
};

const placeTile = (
    coords: number[][],
    boardState: TileState[][],
    setBoardStateAtCoords: (coords: number[][], setTo: TileState) => void,
    increaseScore: (amount: number) => void
): void => {
    setBoardStateAtCoords(coords, TileState.Occupied);
    const rows = checkRowCompletion(boardState);
    const cols = checkColCompletion(boardState);
    const quadrants = checkQuadrantCompletion(boardState);
    for (let coords of rows.concat(cols).concat(quadrants)) {
        setBoardStateAtCoords(coords, TileState.Empty);
    }
    increaseScore(
        coords.length +
            10 * rows.length +
            10 * cols.length +
            10 * quadrants.length +
            5 * (rows.length + cols.length + quadrants.length)
    );
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

const checkCurrentDrag = (
    boardOffsetLeft: number,
    boardOffsetTop: number,
    tileSize: number,
    x: number,
    y: number,
    board: TileState[][],
    tile: number[][]
) => {
    const closestCol = Math.round((x - boardOffsetLeft) / tileSize);
    const closestRow = Math.round((y - boardOffsetTop) / tileSize);
    for (let coord of tile) {
        let rowTry = coord[0] + closestRow;
        let colTry = coord[1] + closestCol;
        if (rowTry < 0 || rowTry >= board.length) {
            return [];
        }
        if (colTry < 0 || colTry >= board.length) {
            return [];
        }
        if (board[rowTry][colTry] === TileState.Occupied) {
            return [];
        }
    }
    return tile.map((coord) => [coord[0] + closestRow, coord[1] + closestCol]);
};

const checkTilesUnplaceable = (board: TileState[][], tiles: number[]) => {
    if (tiles.every((tile) => tile === EMPTY_TILE_SLOT)) {
        return false;
    }

    for (let tileIndex = 0; tileIndex < tiles.length; tileIndex++) {
        let tile = tiles[tileIndex];
        if (tile !== EMPTY_TILE_SLOT) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board.length; j++) {
                    if (canPlace(board, tileSizes[tile], [i, j])) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};

export { canPlace, placeTile, checkCurrentDrag, checkTilesUnplaceable };
