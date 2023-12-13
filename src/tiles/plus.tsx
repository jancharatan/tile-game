import { FunctionComponent } from "react";

const Plus: FunctionComponent<{ size: number }> = ({ size }) => (
    <svg version="1" width={size} height={size}>
        <rect
            style={{ pointerEvents: "none" }}
            x={size / 3}
            y="0"
            width={size / 3}
            height={size / 3}
            fill="white"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x="0"
            y={size / 3}
            width={size / 3}
            height={size / 3}
            fill="white"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x={size / 3}
            y={size / 3}
            width={size / 3}
            height={size / 3}
            fill="white"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x={size * (2 / 3)}
            y={size / 3}
            width={size / 3}
            height={size / 3}
            fill="white"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x={size / 3}
            y={size * (2 / 3)}
            width={size / 3}
            height={size / 3}
            fill="white"
        />
    </svg>
);

export default Plus;
