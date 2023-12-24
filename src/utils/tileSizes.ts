import { TileList } from "./gameEnums";

export const tileSizes = {
    [TileList.Plus]: [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 1],
    ],
    [TileList.Dot]: [[0, 0]],
    [TileList.TwoUp]: [
        [0, 0],
        [1, 0],
    ],
    [TileList.ThreeUp]: [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [TileList.FourUp]: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
    ],
    [TileList.Empty]: [],
};
