import { useState, useRef } from "react";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);


    function handleStart() {
        console.log('Starting timer')
        timer.current = setTimeout(() => {
            setTimerExpired(true)

        }, targetTime * 1000)
        setTimerStarted(true);
    }

    function handleStop() {
        console.log('Stopping timer')
        clearTimeout(timer.current)
        setTimerStarted(false);
        // setTimerExpired(false);
    }
    return (
        <>
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && <p>You lost !</p>}
                <p className="chalenge-time">
                    {targetTime} seconds{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is running' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}