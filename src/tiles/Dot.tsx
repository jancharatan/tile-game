import { FunctionComponent } from "react";

const Dot: FunctionComponent<{ size: number }> = ({ size }) => (
    <svg version="1" width={size} height={size}>
        <rect
            style={{ pointerEvents: "none" }}
            x="0"
            y="0"
            width={size}
            height={size}
            fill="#172554"
        />
    </svg>
);

export default Dot;
