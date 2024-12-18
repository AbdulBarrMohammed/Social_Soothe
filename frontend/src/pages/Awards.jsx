import { useParams } from "react-router-dom";
import { useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Color } from "./Color";
import { colors } from "../data/awardsData";
import { sounds as soundsData } from "../data/awardsData";
import { LogIn } from "../components/Login"
import { getUserCurrentColor } from "../data/dataFunctions";

export function Awards() {
    const params = useParams()
    const type = params.type;
    const [isSounds ,setIsSounds] = useState(false);
    const [isColors, setIsColors] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken

    const [currSounds, setCurrSounds] = useState([]);
    const [buttonsColor, setButtonColor] = useState("#6888BE");

    const [currAudioIndex, setCurrAudioIndex] = useState(0);


    const [lightestBg, setLightestBg] = useState("#ACC8EA");
    const email = cookies.Email

    const setSounds = async () => {
        try {

            const resSounds = await fetch(`http://localhost:8000/sounds/${email}`)
            const dataSounds = await resSounds.json();
            setCurrSounds(filterAvailableSound(dataSounds));

        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setSounds()
    },[])

    useEffect(() => {
        getUserCurrentColor(email, setLightestBg, setButtonColor)
    },[])


    /**
     * Filters sounds of sounds purchased by user
     * @param dataSounds (array)
     * @return availableSounds (array)
     */
    function filterAvailableSound(dataSounds) {
        //Create a list of current sounds in user sound datas to filter the sounds src
        let currSounds = []

        //get users current sounds purchased and add the sound to available sounds
        dataSounds.map((s) => {
            currSounds.push(s.src)
        })

        //list for available sounds
        let availableSounds = []

        //loop through sounds that can be brought
        soundsData.map((s) => {
            console.log(s.wavSound)
            if (!currSounds.includes(s.wavSound)) {
                availableSounds.push(s)
            }
        })

        return availableSounds;

    }

    /**
     * Switches views based on which type of item user wants to view
     * @param event
     * @return none
     */
    useEffect(() => {
        if (type === "Sounds") {
            setIsSounds(true);
            setIsColors(false)
        }
        else if (type == "Colors") {
            setIsColors(true)
            setIsSounds(false)

        }
    }, [type]);

    return (
        <div className="flex-col pt-10 bg-[#ACC8EA] min-h-screen px-10 text-[#44423F]" style={{ backgroundColor: lightestBg }}>

            {isSounds &&
                <>
                    <p className="text-2xl py-3">{type}</p>
                    <div className="flex flex-col gap-3 pb-5">
                        {currSounds.map((sound, index) => {
                                return (
                                        <AudioPlayer audioSrc={sound} index={index} currAudioIndex={currAudioIndex}
                                            setCurrAudioIndex={setCurrAudioIndex}/>

                                    )
                                })
                            }

                    </div>
                </>

            }
            {
                isColors &&
                <>
                    <div className="flex flex-col gap-3 pb-5">
                        {colors.map((color, index) => {
                                return (

                                        <Color color={color}/>

                                    )
                                })
                            }

                    </div>
                </>
            }






        </div>
    )

}
