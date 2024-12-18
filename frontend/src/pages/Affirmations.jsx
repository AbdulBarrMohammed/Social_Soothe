import { useEffect } from "react"
import { data } from "../data/affirmationsData"
import { useState } from "react"
import { useCookies } from "react-cookie";
import { LogIn } from "../components/Login";
import { getUserCurrentColor } from "../data/dataFunctions";

export function Affirmations () {

    const [lightestBg, setLightestBg] = useState("#ACC8EA");
    const [buttonsColor, setButtonColor] = useState("#6888BE");

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email

    const [quote, setQuote] = useState("");
    useEffect(() => {
        const index = Math.floor(Math.random() * data.length-1) + 1;
        setQuote(data[index])

    }, [])

    useEffect(() => {
        getUserCurrentColor(email, setLightestBg, setButtonColor)
    }, [])


    return (

        <>
            {!authToken &&  <LogIn/>}
            {authToken &&
                <div className="flex bg-[#CCDBEE] h-screen justify-center pt-60 gap-10 px-20" style={{ backgroundColor: lightestBg }}>
                    <p className="text-3xl text-center">{quote}</p>
                </div>
            }

        </>

    )

}
