import React, { useState, useEffect } from "react";

const Timer = () => {
  const [minutes, setMinutes] = useState(24);
  const [seconds, setSeconds] = useState(59);
  const [message, setMessage] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(!isRunning);
      setSeconds(seconds - 1);
      console.log("runnning in false");
    } else {
      setIsRunning(false);
      setMinutes(24);
      setTimeout(() => setSeconds(59), 1000);
      //   setSeconds(59); setTimeout avoids a very weird timing bug I cannot solve with interval, where it quickly ignores the 59 to be set and just returns to where it was TODO:: improve this code
      console.log("runnning in true");
    }
  };
  useEffect(() => {
    if (isRunning) {
      console.log("running");
      let interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = message ? 24 : 4;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
            setMessage(!message);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [seconds]);

  const timeMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timeSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="pomodoro">
      {message && (
        <div className="message">
          1 Pomodoro Session Finished! Take a Break :)
        </div>
      )}
      <div className="timer">
        {timeMinutes}:{timeSeconds}
      </div>
      <button className="btn-pomo" onClick={handleClick}>
        {isRunning ? "Reset" : "Start"}
      </button>
    </div>
  );
};

export default Timer;
