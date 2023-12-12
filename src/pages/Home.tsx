import { FunctionComponent } from "react";
import Board from "../components/Board";

const Home: FunctionComponent<{}> = () => {
    return (
        <div className="p-10 items-center">
            <div className="flex flex-row justify-between items-center">
                <div className="w-48 mb-3 text-2xl font-semibold p-2">
                    Tile Game
                </div>
                <div>Score</div>
                <button className="w-48 mb-3 text-2xl font-semibold border-black border-2 bg-white text-black p-2 rounded-md hover:text-white hover:bg-black hover:border-white hover:border-2">
                    Donate
                </button>
            </div>
            <Board />
        </div>
    );
};

export default Home;
