import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";


//Page that display a sound that a user can play and pause in the awards page

export function SoundItem({audioSrc, index, currAudioIndex, setCurrAudioIndex, chosenSound, setChosenSound, currSoundSrc, setCurrSoundSrc }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const playPic =  "../../src/assets/play.svg"
    const pausePic = "../../src/assets/pause.svg"

    const audioRef = useRef(null);

    //pause current audio if the current audio index does not equal the current index of sound clicked
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

    /**
     * pauses and plays to where audio was last paused
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
     * pauses current audio
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
     * sets the current sound that is clicked
     * @param none
     * @return none
     */
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
