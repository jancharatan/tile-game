import { FunctionComponent } from "react";

const TileFactory: FunctionComponent<{ size: number; tiles: number[][] }> = ({
    size,
    tiles,
}) => {
    let widthMax = Math.max(...tiles.map((tuple) => tuple[1])) + 1;
    let heightMax = Math.max(...tiles.map((tuple) => tuple[0])) + 1;
    return (
        <svg version="1" width={widthMax * size} height={heightMax * size}>
            {tiles.map((coord) => (
                <rect
                    key={`${coord[1]}, ${coord[0]}`}
                    style={{ pointerEvents: "none" }}
                    x={coord[1] * size}
                    y={coord[0] * size}
                    width={size}
                    height={size}
                    fill="#172554"
                />
            ))}
        </svg>
    );
};

export default TileFactory;
