import { FunctionComponent } from "react";

const Plus: FunctionComponent<{ size: number }> = ({ size }) => (
    <svg version="1" width={size * 3} height={size * 3}>
        <rect
            style={{ pointerEvents: "none" }}
            x={size}
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
            x={size}
            y={size}
            width={size}
            height={size}
            fill="#172554"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x={size * 2}
            y={size}
            width={size}
            height={size}
            fill="#172554"
        />
        <rect
            style={{ pointerEvents: "none" }}
            x={size}
            y={size * 2}
            width={size}
            height={size}
            fill="#172554"
        />
    </svg>
);

export default Plus;
