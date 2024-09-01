import React, { useEffect, useState } from "react";

export default function SetStopwatch() {
  const [timeExpired, setTimeExpired] = useState("0:00");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let seconds = 0;
    let minutes = 0;
    let timeoutId;

    const tick = () => {
      seconds += 1;
      if (seconds === 60) {
        seconds = 0;
        minutes += 1;
      }

      const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      setTimeExpired(formattedTime);

      // Schedule the next tick only if the stopwatch is still running
      timeoutId = setTimeout(tick, 1000);
    };

    if (isRunning) {
      timeoutId = setTimeout(tick, 1000);
    }

    // Cleanup the timeout when the component unmounts or when the timer stops
    return () => clearTimeout(timeoutId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  const handleReset=()=>{
  setTimeExpired('0.00');
  }
  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {timeExpired}</p>
      <button onClick={isRunning ? (handleStop):(handleStart)}>
        {isRunning?'Start':'Stop'}
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
