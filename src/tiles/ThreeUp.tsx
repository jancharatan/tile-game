import { FunctionComponent } from "react";

const ThreeUp: FunctionComponent<{ size: number }> = ({ size }) => (
    <svg version="1" width={size} height={size * 3}>
        <rect
            style={{ pointerEvents: "none" }}
            x="0"
            y="0"
            width={size}
            height={size}
            fill="#172554"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x="0"
            y={size}
            width={size}
            height={size}
            fill="#172554"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x="0"
            y={2 * size}
            width={size}
            height={size}
            fill="#172554"
        />
    </svg>
);

export default ThreeUp;
