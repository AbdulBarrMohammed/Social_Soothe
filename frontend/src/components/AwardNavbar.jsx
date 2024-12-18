import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
export function AwardNavbar() {
    const [lightestBg, setLightestBg] = useState("");
    const [buttonsColor, setButtonColor] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
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
                setButtonColor("#4470AD")
            }
            else {
                //check for current user color in users purchased colors to set chosen background color
                dataColors.map((c) => {
                    if (c.name === dataColor.currColor) {
                        setLightestBg(c.lightest)
                        setButtonColor(c.semiDark)
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
        <div className="bg-[#ACC8EA] px-10 py-5 text-[#44423F]" style={{ backgroundColor: lightestBg }}>
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Use your leafs to earn awards</h1>
                <h2 className="text-2xl font-medium">Choose some of the options below to better your experience in social sooth</h2>
                <div className="flex gap-5 pt-3 text-white">
                    <Link to={"/awards/Sounds"} className=" p-4 rounded-xl" style={{ backgroundColor: buttonsColor }}>
                        Breathing exercise sounds
                    </Link>
                    <Link to={"/awards/Colors"} className=" p-4 rounded-xl" style={{ backgroundColor: buttonsColor }}>
                        Color schemes
                    </Link>
                </div>
            </div>
        </div>
    )
}
