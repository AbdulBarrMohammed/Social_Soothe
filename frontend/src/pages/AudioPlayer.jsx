import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function AudioPlayer({audioSrc, index, currAudioIndex, setCurrAudioIndex }) {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [currCoins, setCurrCoins] = useState(0);
    const [sounds, setSounds] = useState([]);

    const [isPlaying, setIsPlaying] = useState(false);
    const playPic =  "../../src/assets/play.svg"
    const pausePic = "../../src/assets/pause.svg"


    const audioRef = useRef(null);

    useEffect(() => {
        if (currAudioIndex !== index && isPlaying) {
            pause();
        }
    }, [currAudioIndex]);



    const getCoins = async () => {
        try {
            const res = await fetch(`http://localhost:8000/user/${email}`)
            const data = await res.json();
            setCurrCoins(data.coins)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCoins()
    },[])

    const getSounds = async () => {
        try {
            const res = await fetch(`http://localhost:8000/sounds/${email}`)
            const data = await res.json();

            setSounds(data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSounds()
    },[])

    function handlePlay() {

        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            setCurrAudioIndex(index); // Set the current audio index to this component's index
        }
    }

    function playPause() {
        if (isPlaying) {
            pause();
        }
        else {
            handlePlay();
        }

    }

    function pause() {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    async function buyBtn() {
        //first check if user already brought sound
        console.log("sounds list", sounds)
        console.log("current coins", currCoins)
        console.log("audio name", audioSrc.title)
        if (sounds) {
            sounds.map((soundObj) => {
                if (audioSrc.title == soundObj.name) {
                    alert("You already brought this item");
                    window.location.reload();

                }

            })
        }

        const currPrice = audioSrc.price

        if (currPrice > currCoins) {
            console.log("You do not have enough leafs")
            console.log(currPrice, currCoins)
        }
        else {
            //subract price from current leafs
            const coins = Number(currCoins) - Number(audioSrc.price)

            //add new leaf price to database
            try {
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

            } catch(err) {
                console.log(err)
            }
        }


    }

    return (
        <div className="">
            <div className="bg-[#6888BE] flex justify-between p-7 rounded-xl text-white">
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
                        <img src={'../src/assets/leaf.png'} className="h-5"/>

                    </div>

                    <button onClick={buyBtn} className="border border-white bg-[#6888BE] px-10 py-2 rounded-3xl">
                        Buy
                    </button>

                </div>
            </div>
        </div>

    )

}
