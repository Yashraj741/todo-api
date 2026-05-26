import React, { useState, useEffect } from "react";
import "./typewriter.css";

export default function Typewriter({ text = "", speed = 60, startDelay = 0, loop = false, className = "" }) {
    const [display, setDisplay] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let mounted = true;
        let timer;
        const startTimer = setTimeout(() => {
            setShowCursor(true);
            let i = 0;
            const tick = () => {
                if (!mounted) return;
                if (i <= text.length) {
                    setDisplay(text.slice(0, i));
                    i++;
                    timer = setTimeout(tick, speed);
                } else if (loop) {
                    timer = setTimeout(() => {
                        i = 0;
                        setDisplay("");
                        tick();
                    }, 800);
                } else {
                    // finished and not looping -> hide cursor
                    setShowCursor(false);
                }
            };
            tick();
        }, startDelay);

        return () => {
            mounted = false;
            clearTimeout(timer);
            clearTimeout(startTimer);
        };
    }, [text, speed, startDelay, loop]);

    return (
        <span className={className}>
            {display}
            {showCursor && <span className="typewriter-cursor" aria-hidden="true">|</span>}
        </span>
    );
}
