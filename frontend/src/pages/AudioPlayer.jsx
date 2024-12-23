import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import ReactConfetti from 'react-confetti';
import { getUserCurrentColor } from "../data/dataFunctions";


export function AudioPlayer({audioSrc, index, currAudioIndex, setCurrAudioIndex }) {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [currCoins, setCurrCoins] = useState(0);
    const [sounds, setSounds] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const playPic =  "../../src/assets/play.svg"
    const pausePic = "../../src/assets/pause.svg"


    const audioRef = useRef(null);

    const [buttonsColor, setButtonColor] = useState("#6888BE");
    const [lightestBg, setLightestBg] = useState("#ACC8EA");

    useEffect(() => {
        getUserCurrentColor(email, setLightestBg, setButtonColor)
    },[])

    useEffect(() => {
        //if current audio index does not equal the index clicked and sound is playing then pause the sound
        if (currAudioIndex !== index && isPlaying) {
            pause();
        }
    }, [currAudioIndex]);


    /**
     * Function to get all of current users color and coin amount data in database
     * @param none
     * @return none
     */
    const getData = async () => {
        try {
            const resCoins = await fetch(`http://localhost:8000/user/${email}`)
            const dataCoins = await resCoins.json();
            setCurrCoins(dataCoins.coins)

            const resSounds = await fetch(`http://localhost:8000/sounds/${email}`)
            const dataSounds = await resSounds.json();



            setSounds(dataSounds)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])

    /**
     * Function to play current sound that is pressed by user
     * @param none
     * @return none
     */
    function handlePlay() {

        //Check if their is an audio current
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            setCurrAudioIndex(index); // Set the current audio index to this component's index
        }
    }

    /**
     * Pauses and plays current audio that is playing
     * @param none
     * @return none
     */
    function playPause() {
        if (isPlaying) {
            pause();
        }
        else {
            handlePlay();
        }

    }

    /**
     * Pauses current audio that is playing
     * @param none
     * @return none
     */
    function pause() {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    /**
     * Adds sound purchased by user to their sounds list in their database
     * @param none
     * @return none
     */
    async function buyBtn() {
        let brought = false;

        //first check if user already brought sound
        if (sounds) {
            sounds.map((soundObj) => {
                if (audioSrc.title == soundObj.name) {
                    alert("You already brought this item");
                    brought = true

                }

            })

            //If item was not brought
            if (!brought) {

                //Grab current price of item user wants to purchase
                const currPrice = audioSrc.price

                //Checks if users coins are enough to buy item
                if (currCoins >= currPrice) {

                    //Subracts price from current leafs
                    const coins = Number(currCoins) - Number(audioSrc.price)

                    //Adds new leaf price to database
                    try {
                        //First checks if user wants to buy item
                        if (confirm("Are you sure you want to purchase this?")) {

                            const response = await fetch(`http://localhost:8000/user/update`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({coins, email})
                            })

                            const name = audioSrc.title
                            const src = audioSrc.wavSound
                            const responseSound = await fetch(`http://localhost:8000/sounds/create`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({email, name, src})
                            })


                            window.location.reload()


                        }
                        else {
                            navigate("/awards");
                        }

                    } catch(err) {
                        console.log(err)
                    }
                }
                else {
                    alert("You do not have enough leafs");
                }

            }


        }

    }

    return (
        <div className="">

            <div className=" flex justify-between p-7 rounded-2xl text-white" style={{ backgroundColor: buttonsColor }}>
                <div className="flex gap-4 items-center">
                    <button onClick={playPause}>
                        {isPlaying ? <img src={pausePic} className="h-10"/> : <img src={playPic} className="h-10"/>}
                    </button>
                    <p>{audioSrc.title}</p>
                    <audio ref={audioRef} src={audioSrc.wavSound} />

                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-cente gap-2">
                        <p>{audioSrc.price}</p>
                        <img src={'../src/assets/leaf-2.png'} className="h-5"/>

                    </div>
                    {showConfetti && <ReactConfetti/>}
                    <button onClick={buyBtn} className="px-10 py-2 rounded-3xl hover:underline underline-offset-8 decoration-4 transition-all duration-300 ease-in-out" style={{ backgroundColor: buttonsColor}}>
                        Buy
                    </button>

                </div>
            </div>


        </div>

    )

}
