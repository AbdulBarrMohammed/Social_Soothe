import { useEffect } from "react"
import { data } from "../data/affirmationsData"
import { useState } from "react"
import { useCookies } from "react-cookie";
import { LogIn } from "../components/Login";

export function Affirmations () {

    const [lightestBg, setLightestBg] = useState("#ACC8EA");
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email

    const [quote, setQuote] = useState("");
    useEffect(() => {
        const index = Math.floor(Math.random() * data.length-1) + 1;
        setQuote(data[index])

    }, [])


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
