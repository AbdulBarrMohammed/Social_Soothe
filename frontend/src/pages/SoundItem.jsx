import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";


export function SoundItem({audioSrc, index, currAudioIndex, setCurrAudioIndex, chosenSound, setChosenSound, currSoundSrc, setCurrSoundSrc }) {

    // site cookies for current user
    const [cookies, setCookie, removeCookie] = useCookies(null)

    //auth token and user email
    const authToken = cookies.AuthToken
    const email = cookies.Email


    const [isPlaying, setIsPlaying] = useState(false);
    const playPic =  "../../src/assets/play.svg"
    const pausePic = "../../src/assets/pause.svg"


    const audioRef = useRef(null);

    useEffect(() => {
        if (currAudioIndex !== index && isPlaying) {
            pause();
        }
    }, [currAudioIndex]);

    /**
     * plays current audio
     * @param none
     * @return none
     */
    function handlePlay() {

        //check if current audio exists
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            setCurrAudioIndex(index); // settting the current audio index to this component's index
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

    function handleSoundClick() {
        setChosenSound(audioSrc.name)
        setCurrSoundSrc(audioSrc.src)

    }

    return (
        <>
            <div onClick={handleSoundClick} className="bg-[#6888BE] flex justify-between p-7 rounded-xl text-white">
                <audio ref={audioRef} src={audioSrc.src} />
                <div className="flex gap-4 items-center">
                    <button onClick={playPause}>
                        {isPlaying ? <img src={pausePic} className="h-10"/> : <img src={playPic} className="h-10"/>}
                    </button>
                    <p>{audioSrc.title}</p>


                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-cente gap-2">
                        <p>{audioSrc.price}</p>
                        <img src={'../src/assets/leaf.png'} className="h-5"/>

                    </div>
                </div>
            </div>
        </>
    )
}
