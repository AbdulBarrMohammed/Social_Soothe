import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { breatheInfo } from "./breatheData";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function Breathe() {

    const params = useParams()
    const startNum = parseInt(params.start);
    const middleNum = parseInt(params.middle);
    const endNum = parseInt(params.end);

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email

    const [counter, setCounter] = useState(startNum);
    const [isActive, setIsActive] = useState(false);

    // number to keep track of how many times the timer goes
    const [turn, setTurn] = useState(0);
    const [breathe, setBreathe] = useState("Breathe in...");
    const [description, setDescription] = useState("")
    const [rounds, setRounds] = useState(1)

    const [title, setTitle] = useState("");
    const [bgSound, setBgSound] = useState("");
    const [sounds, setSounds] = useState("");



    const breatheInAudio = useRef(new Audio("../../src/assets/breathe-in.wav"))
    const exhaleAudio = useRef(new Audio("../../src/assets/exhale.wav"))
    const currBgSound = useRef(null);


    const navigate = useNavigate()

    useEffect(() => {
        // Update the bg sound reference when bgSound changes
        if (bgSound) {
            currBgSound.current = new Audio(bgSound);
        }
    }, [bgSound]);

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


    const getCurrSound = async () => {
        try {
            const res = await fetch(`http://localhost:8000/user/${email}`)
            const data = await res.json();
            //setBgSound(data.currSound)
            console.log('current data', data.currSound)

            const resSounds = await fetch(`http://localhost:8000/sounds/${email}`)
            const dataSounds = await resSounds.json();

            setSounds(dataSounds)

            console.log("sounds ->", dataSounds);
            dataSounds.map((s) => {
                console.log(s);
                if (s.name == data.currSound) {
                    console.log("WE HAVE FOUND A SOUND", s.src)
                    setBgSound(s.src)

                }

            })

        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCurrSound()
    }, [])




    const [key, setKey] = useState(0); // re-render the timer

    const restart = () => {
            //currBgSound.current.play()
            if (turn == 2 || turn == 5 || turn == 8) {
                breatheInAudio.current.play()
                setRounds(rounds + 1)
                setBreathe("Breathe in...")
                setCounter(startNum)
            }

            else if (turn == 0 || turn == 3 || turn == 6 || turn == 9) {
                setBreathe("Hold breathe...")
                setCounter(middleNum)
            }
            else if (turn == 1 || turn == 4 || turn == 7 || turn == 10) {
                exhaleAudio.current.play()
                setBreathe("exhale...")
                setCounter(endNum)
            }
            setIsActive(true);
            setTurn(turn + 1);
            // Increment the key to re-render the timer
            setKey((prevKey) => prevKey + 1);

    };

        //clear timer to original values
        const clear = () => {
            setIsActive(false);
            setCounter(startNum);
            setTurn(0);
            setBreathe("Breathe in...")
            setRounds(1)
            setKey((prevKey) => prevKey + 1);
        };

        const handleComplete = () => {
            // end of breathing exercise
            if (turn == 11) {
                setIsActive(false);
                setTurn(0);
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
            currBgSound.current.pause()
            breatheInAudio.current.pause()
            exhaleAudio.current.pause()

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
            if (startNum == 3) {
                if (counter == endNum && (turn == 1 || turn == 4 || turn == 7 || turn == 10)) {
                    console.log("hold")
                }
                else if (counter == startNum && (turn == 2 || turn == 5 || turn == 8 || turn == 11)) {
                    exhaleAudio.play()
                }
                else {
                    breatheInAudio.current.play()
                }

            }
            else {

                //before checking check if the exercise is in the breathing stage which should have counter of start number
                if (counter == startNum) {
                    breatheInAudio.current.play()
                }
                else if (counter == endNum) {
                    exhaleAudio.current.play()
                }

            }
            setIsActive(true)

        }


  useEffect(() => {
    let timer;
    // check if the breathing exercise is active and counter is greater than 9
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


  function openPlayBgSound() {

    console.log("The current bg sound playing is: ", currBgSound)
    currBgSound.current.play()

  }

  return (
    <div className="flex bg-[#ACC8EA] h-screen justify-center pt-10 gap-10">

        <div className="flex flex-col items-center gap-5 ">
            <div>
                <h3 className="font-bold text-2xl">Progress Timer</h3>
            </div>
            <div key={key} id="pomodoro-timer" className="Progressbar">
                <CountdownCircleTimer
                onComplete={handleComplete}
                isPlaying={isActive}
                duration={counter}
                colors={"#4470AD"}
                size={350}
                >
                {renderTime}


                </CountdownCircleTimer>

            </div>
            <div className="flex gap-5">

                <button className="bg-[#4470AD] p-3 rounded-2xl text-white shadow-md" onClick={clear}>Restart</button>
                <button className="bg-[#4470AD] p-3 rounded-2xl text-white shadow-md" onClick={start}>Start</button>
                <button className="bg-[#4470AD] p-3 rounded-2xl text-white shadow-md"  onClick={pause}>Pause</button>
                <button className="bg-[#4470AD] p-3 rounded-2xl text-white shadow-md"  onClick={openPlayBgSound}>Play background sound</button>
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
