import { useParams } from "react-router-dom";
import { sounds } from "./awardsData";
import { useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function Awards() {
    const params = useParams()
    const type = params.type;
    const [isSounds ,setIsSounds] = useState(false);
    const [isFonts, setIsFonts] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email



    const [currAudioIndex, setCurrAudioIndex] = useState(0);

    useEffect(() => {
        if (type === "Sounds") {
            setIsSounds(true);
            setIsFonts(false);
        } else if (type === "Fonts") {
            setIsFonts(true);
            setIsSounds(false);
        }
    }, [type]);

    return (
        <div className="flex-col pt-10 bg-[#ACC8EA] min-h-screen px-10">
            {isSounds &&
                <>
                    <p className="text-2xl py-3">{type}</p>
                    <div className="flex flex-col gap-3 pb-5">
                        {sounds.map((sound, index) => {
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
                isFonts &&
                <>
                    <p>This is fonts</p>
                </>
            }



        </div>
    )

}
