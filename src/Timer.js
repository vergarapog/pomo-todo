import React, { useState, useEffect } from "react";
import Sound from "react-sound";

const Timer = () => {
  const [minutes, setMinutes] = useState(24);
  const [seconds, setSeconds] = useState(59);
  const [message, setMessage] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false); //for react-sound

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
    if (minutes > 5) {
      setMessage(false);
    }

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

            setIsPlaying(true);

            setSeconds(seconds);
            setMinutes(minutes);
            setMessage(!message);

            setTimeout(() => {
              setIsPlaying(false);
            }, 2000);
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
      <Sound
        url="https://my-s3-uploads103811-dev.s3.amazonaws.com/mixkit-bell-notification-933.wav"
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={0 /* in milliseconds */}
        volume={30}
      />
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
