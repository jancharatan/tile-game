import { app } from "@/firebase/config";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { GoogleIcon } from "@/utils/Icons";
import { FunctionComponent } from "react";

const signIntoGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
        console.log(error.code, error.message);
    });
};

const signOutOfGoogle = () => {
    const auth = getAuth(app);
    signOut(auth);
};

const LogIn: FunctionComponent<{ displayName: string | null | undefined }> = ({
    displayName,
}) => {
    return (
        <div>
            {displayName ? (
                <button
                    className="w-32 md:w-40 text-lg md:text-xl font-semibold border-black border-2 bg-white text-black p-1 rounded-md hover:text-white hover:bg-black hover:border-white"
                    onClick={() => signOutOfGoogle()}
                >
                    Log Out
                </button>
            ) : (
                <button
                    className="flex flex-row items-center justify-center w-32 md:w-40 text-lg md:text-xl font-semibold border-black border-2 bg-white text-black p-1 rounded-md hover:text-white hover:bg-black hover:border-white"
                    onClick={() => signIntoGoogle()}
                >
                    <div className="mr-2">Log In</div>
                    <GoogleIcon size={20} />
                </button>
            )}
        </div>
    );
};

export default LogIn;
