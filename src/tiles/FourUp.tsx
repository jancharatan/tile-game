import { FunctionComponent } from "react";

const FourUp: FunctionComponent<{ size: number }> = ({ size }) => (
    <svg version="1" width={size} height={size * 4}>
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
        <rect
            style={{ pointerEvents: "none" }}
            x="0"
            y={3 * size}
            width={size}
            height={size}
            fill="#172554"
        />
    </svg>
);

export default FourUp;
