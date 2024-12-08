import { useParams } from "react-router-dom";
import { sounds } from "../data/awardsData";
import { useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Color } from "./Color";
import { colors } from "../data/awardsData";

export function Awards() {
    const params = useParams()
    const type = params.type;
    const [isSounds ,setIsSounds] = useState(false);
    const [isFonts, setIsFonts] = useState(false);
    const [isColors, setIsColors] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [itemBrought, setItemBrought] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const authToken = cookies.AuthToken

    const [currAudioIndex, setCurrAudioIndex] = useState(0);


    const [lightestBg, setLightestBg] = useState("#ACC8EA");
    const email = cookies.Email

    const setBgColor = async () => {
        try {
            //Get users current pick for a background color
            const resColor = await fetch(`http://localhost:8000/user/${email}`)
            const dataColor = await resColor.json();

            const resColors = await fetch(`http://localhost:8000/colors/${email}`)
            const dataColors = await resColors.json();

            if (dataColor.currColor.toLowerCase() == 'blue') {
                setLightestBg("#ACC8EA")
            }
            else {
                //check for current user color in users purchased colors to set chosen background color
                dataColors.map((c) => {
                    if (c.name === dataColor.currColor) {
                        setLightestBg(c.lightest)
                    }
                })
            }

        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setBgColor()
    },[])

    /**
     * Switches views based on which type of item user wants to view
     * @param event
     * @return none
     */
    useEffect(() => {
        if (type === "Sounds") {
            setIsSounds(true);
            setIsFonts(false);
            setIsColors(false)
        } else if (type === "Fonts") {
            setIsFonts(true);
            setIsSounds(false);
            setIsColors(false)
        }
        else if (type == "Colors") {
            setIsColors(true)
            setIsFonts(false)
            setIsSounds(false)

        }
    }, [type]);

    return (
        <div className="flex-col pt-10 bg-[#ACC8EA] min-h-screen px-10 text-[#44423F]" style={{ backgroundColor: lightestBg }}>


            {isSounds &&
                <>

                    <p className="text-2xl py-3">{type}</p>
                    <div className="flex flex-col gap-3 pb-5">
                        {sounds.map((sound, index) => {
                                return (

                                        <AudioPlayer audioSrc={sound} index={index} currAudioIndex={currAudioIndex}
                                            setCurrAudioIndex={setCurrAudioIndex} setItemBrought={setItemBrought}/>


                                    )
                                })
                            }

                    </div>
                </>

            }
            {
                isFonts &&
                <>
                    <p>This is fonts</p>
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
