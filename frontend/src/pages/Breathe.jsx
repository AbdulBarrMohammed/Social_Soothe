import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { breatheInfo } from "./breatheData";

export function Breathe() {

    const params = useParams()
    const startNum = parseInt(params.start);
    const middleNum = parseInt(params.middle);
    const endNum = parseInt(params.end);

    const [counter, setCounter] = useState(startNum);
    const [isActive, setIsActive] = useState(false);

    // number to keep track of how many times the timer goes
    const [turn, seTurn] = useState(0);
    const [breathe, setBreathe] = useState("Breathe in...");
    const [description, setDescription] = useState("")
    const [rounds, setRounds] = useState(1)

    const [title, setTitle] = useState("");


    const breatheInAudio = new Audio("../../src/assets/breathe-in.wav")
    const exhaleAudio = new Audio("../../src/assets/exhale.wav")

    useEffect(() => {
        if (endNum === 3) {
            setTitle(breatheInfo[0].title);
            setDescription(breatheInfo[0].info)
        } else if (endNum === 6) {
            setTitle(breatheInfo[1].title);
            setDescription(breatheInfo[1].info)
        } else {
            setTitle(breatheInfo[2].title);
            setDescription(breatheInfo[2].info)
        }
    }, [endNum]);

    const [key, setKey] = useState(0); // To re-render the timer

    /*
    if (startNum == 3) {
        //3-3-3
    } */

    const restart = () => {
            if (turn == 2 || turn == 5 || turn == 8) {
                breatheInAudio.play()
                setRounds(rounds + 1)
                setBreathe("Breathe in...")
                setCounter(startNum)

            }

            else if (turn == 0 || turn == 3 || turn == 6 || turn == 9) {
                setBreathe("Hold breathe...")
                setCounter(middleNum)
            }
            else if (turn == 1 || turn == 4 || turn == 7 || turn == 10) {
                exhaleAudio.play()
                setBreathe("exhale...")
                setCounter(endNum)
            }
            setIsActive(true);
            setGo(turn + 1);
            // Increment the key to re-render the timer
            setKey((prevKey) => prevKey + 1);

    };

        //clear timer to original values
        const clear = () => {
            setIsActive(false);
            setCounter(startNum);
            setGo(0);
            setBreathe("Breathe in...")
            setRounds(1)
            setKey((prevKey) => prevKey + 1);
        };

        const handleComplete = () => {
            // end of breathing exercise
            if (turn == 11) {
                setIsActive(false);
                setGo(0);
                setKey(0)
                setCounter(startNum)
                setRounds(1)
                setBreathe("Breathe in...")
            }
             else {

                restart();
            }
            return [false, 0]; // Return false to stop the timer

        };

        const pause = () => {
            setIsActive(false)
            breatheInAudio.pause()
            exhaleAudio.pause()
        }

        const renderTime = ({ remainingTime }) => {
            return (
                <div className="timer flex flex-col items-center justify-center">
                    <div className="value">{remainingTime}</div>
                    <div className="text">seconds</div>
                    {isActive &&
                        breathe

                    }

                    {isActive &&
                        rounds

                    }
                </div>
            );
        };


        const start = () => {
            //first check if the exercise is the 3-3-3 pattern
            console.log(go, "this is the go value")
            if (startNum == 3) {

                if (counter == endNum && (go == 1 || go == 4 || go == 7 || go == 10)) {
                    console.log("hold")
                }
                else if (counter == startNum && (go == 2 || go == 5 || go == 8 || go == 11)) {
                    exhaleAudio.play()
                }
                else {
                    breatheInAudio.play()
                }


            }
            else {
                //before checking check if the exercise is in the breathing stage which should have counter of start number
                if (counter == startNum) {
                    breatheInAudio.play()
                }
                else if (counter == endNum) {
                    exhaleAudio.play()
                }

            }
            setIsActive(true)

        }


  useEffect(() => {
    let timer;
    if (isActive && counter > 0) {
      timer = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        9000
      );
    } else if (!isActive && counter !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [counter, isActive]);

  return (
    <div className="flex bg-[#CCDBEE] h-screen justify-center pt-10 gap-10">

        <div className="flex flex-col items-center gap-5 ">
            <div>
                <h3 className="font-bold text-2xl">Progress Timer</h3>
            </div>
            <div key={key} id="pomodoro-timer" className="Progressbar">
                <CountdownCircleTimer
                onComplete={handleComplete}
                isPlaying={isActive}
                duration={counter}
                colors={"#6888BE"}
                size={350}
                >
                {renderTime}


                </CountdownCircleTimer>

            </div>
            <div className="flex gap-5">

                <button className="bg-[#6888BE] p-3 rounded-2xl text-white shadow-md" onClick={clear}>Restart</button>
                <button className="bg-[#6888BE] p-3 rounded-2xl text-white shadow-md" onClick={start}>Start</button>
                <button className="bg-[#6888BE] p-3 rounded-2xl text-white shadow-md"  onClick={pause}>Pause</button>
            </div>
        </div>
        <div>

        </div>

        <div className="flex flex-col w-1/3 gap-5">
            <h2 className="font-bold text-3xl">{title}</h2>
            <p>{description}</p>
        </div>

    </div>

  );


}
