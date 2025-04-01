import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef(); // for storing the timer ID
    const dialog = useRef(); // for forwarding ref to the modal; availabe for React v19 and above; older versions use forwardRef()

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); // in milliseconds
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000; // true if timer is active
    if (timeRemaining <= 0) {
        clearTimeout(timer.current)
        dialog.current.open()
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000)

    }


    function handleStart() {
        console.log('Starting timer')
        timer.current = setInterval(() => {
            // setTimerExpired(true)
            // dialog.current.showModal()
            // dialog.current.open() // when using useImperativeHandle in ResultModal.jsx
            setTimeRemaining(prevTimeRemaining => {
                return prevTimeRemaining - 10; // decrement by 1 second
            })

        }, 10)
    }

    function handleStop() {
        dialog.current.open()
        console.log('Stopping timer')
        // clearTimeout(timer.current)
        clearInterval(timer.current)
        // setTimerExpired(false);
    }
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="chalenge-time">
                    {targetTime} seconds{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}