import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { SoundItem } from "./SoundItem";
import { useNavigate } from "react-router-dom";


export function UserSounds() {
    const [sounds, setSounds] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [chosenSound, setChosenSound] = useState("None");
    const [currSoundSrc, setCurrSoundSrc] = useState("");
    const navigate = useNavigate()
    const [userCurrSound, setUserCurrSound] = useState("");

    const [currAudioIndex, setCurrAudioIndex] = useState(0);

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

    const getCurrSound = async () => {
        try {
            const res = await fetch(`http://localhost:8000/user/${email}`)
            const data = await res.json();
            setUserCurrSound(data.src)

        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCurrSound()
    }, [])


    async function handleDone() {
        //update curr user sound
        if (currSoundSrc) {
            const sound = currSoundSrc
            try {
                const response = await fetch(`http://localhost:8000/user/sound/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({sound, email})
                })
            } catch(err) {
                console.log(err)
            }

        }
        else {
            alert("You did not pick a selection")
        }

        navigate(-1)

    }


    return (
            <>
                <p className="text-2xl py-3">Choose a sound for background noises for breathing exercise</p>
                <p>Chosen sound: {chosenSound}</p>
                <div className="flex flex-col gap-3 pb-5">
                        {sounds.map((sound, index) => {
                                return (

                                    <SoundItem audioSrc={sound} index={index} currAudioIndex={currAudioIndex}
                                    setCurrAudioIndex={setCurrAudioIndex} chosenSound={chosenSound} setChosenSound={setChosenSound}
                                    currSoundSrc={currSoundSrc}
                                    setCurrSoundSrc={setCurrSoundSrc}

                                    />

                                    )
                                })
                        }

                    </div>

                    <button onClick={handleDone}>Done</button>
                </>
    )

}
