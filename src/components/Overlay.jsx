import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {
    const { progress } = useProgress()
    const { play, end, setPlay, hasScroll } = usePlay()
    
    return (
        <div className = {`overlay ${play ? "overlay--disable" : ""}
        ${hasScroll ? "overlay--scrolled" : ""}`}>
            <div className={`loader ${progress === 100 ? "loader--disappear": ""}`} />
            {
                progress === 100 && (
                <div className={`intro ${play ? "intro--disappear" : ""}`}>
                    <h1 className="logo">
                        ATMOS
                        <div className="spinner">
                            <div className="spinner_image" />
                        </div>
                    </h1>
                    <p className="intro_scroll">Scroll to begin the journey</p>
                    <button className="explore" onClick={() => {
                        setPlay(true);
                    }}>EXPLORE</button>
                </div>
            )}
            <div className={`outro ${end ? "outro--appear" : ""}`}>
                <p className="outro_text">
                    Wish you had a great flight with us
                </p>
            </div>
        </div>
    );
};