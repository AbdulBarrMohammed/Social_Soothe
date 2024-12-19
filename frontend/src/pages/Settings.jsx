
import { useEffect } from "react"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LogIn } from "../components/Login";
import { getUserCurrentColor } from "../data/dataFunctions";


export function Settings() {

    const [colors, setColors] = useState([]);
    const [sounds, setSounds] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const navigate = useNavigate()
    const [lightestBg, setLightestBg] = useState("#ACC8EA");
    const [buttonsColor, setButtonColor] = useState("#6888BE");

    //Current sound, and background color user has chosen
    const [currBgColor, setCurrBgColor] = useState("")
    const [currBgSound, setCurrBgSound] = useState("")


    /**
     * gets current users purchased colors and sounds
     * @param none
     * @return none
     */
    const getData = async () => {
        try {

            //Get user colors from backend route
            const resColors = await fetch(`http://localhost:8000/colors/${email}`)
            const dataColors = await resColors.json();
            setColors(dataColors)

            //Get user sounds from backend route
            const resSounds = await fetch(`http://localhost:8000/sounds/${email}`)
            const dataSounds = await resSounds.json();
            setSounds(dataSounds)


        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])


    /**
     * Gets current color chosen in dropdown and stores color in users current color in database
     * @param event
     * @return none
     */
    async function handleChangeColor(e) {
        e.preventDefault()

        //Grabs current color chosen
        const color = e.target.value
        setCurrBgColor(color)

    }

    /**
     * Gets current sound chosen in dropdown and stores sound in users current sound in database
     * @param event
     * @return none
     */
    async function handleChangeSound(e) {
        e.preventDefault()

        //Grab current sound
        const sound = e.target.value
        setCurrBgSound(sound)

    }

    /**
     * Saves users choice for background sound and color
     * @param event
     * @return none
     */
    async function saveChanges(){

        //Checks if a current background sound is chose
        if (currBgSound) {
            const sound = currBgSound
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
            navigate("/dashboard");
        }

        //Checks if color is picked and stores the color in the database in the backend
        if (currBgColor) {
            const color = currBgColor
            try {
                const response = await fetch(`http://localhost:8000/user/color/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({color, email})
                })
            } catch(err) {
                console.log(err)
            }
        }
        else {
            navigate("/dashboard");
        }

        navigate("/dashboard");

    }


    useEffect(() => {
        getUserCurrentColor(email, setLightestBg, setButtonColor)
    },[])

    return (
        <>
        {!authToken &&  <LogIn/>}

        {authToken &&

        <div className="flex flex-col px-20 pt-10 h-screen text-[#44423F] gap-10" style={{ backgroundColor: lightestBg }}>
            <div className="pb-5">
                <h1 className="text-4xl font-bold">Account Settings</h1>

            </div>
            <div className="">
                <h1 className="text-2xl font-bold">Appearance</h1>
                <hr className="border-[#44423F] border mb-5" />
                <p className="font-bold text-xl">Choose a background color</p>
                <select onClick={(e) => handleChangeColor(e)} className="px-10 py-3 rounded-lg text-white" style={{ backgroundColor: buttonsColor }}>
                <option value="">Background colors</option>
                    {colors.map((color, index) => {
                        return (
                            <option key={index}>
                                {color.name}
                            </option>
                        );
                    })}
                    <option>{"Blue"}</option>
                </select>

            </div>
            <div className="">
                <h1 className="text-2xl font-bold">Background Sounds</h1>
                <hr className="border-[#44423F] border mb-5" />
                <p className="font-bold text-xl">Choose a background sound for breathing exercise</p>
                <select onClick={(e) => handleChangeSound(e)} className="px-10 py-3 rounded-lg text-white" style={{ backgroundColor: buttonsColor }}>
                <option value="">background sounds</option>
                    {sounds.map((sound, index) => {
                        return (
                            <option key={index}>
                                {sound.name}
                            </option>
                        );
                    })}
                    <option>{"Default breathing"}</option>
                </select>

            </div>
            <div className="pb-5">
                <h1 className="text-2xl font-bold">Delete account</h1>
                <hr className="border-[#44423F] border mb-5" />
                <p>Press button below to delete account</p>
                <button className="rounded-xl text-white px-10 py-3 " style={{ backgroundColor: buttonsColor }}>delete account</button>

            </div>

            <div className="">
                <h2 className="text-2xl font-bold">Save changes</h2>
                <button className="rounded-xl text-white px-10 py-3 " onClick={saveChanges} style={{ backgroundColor: buttonsColor }}>Save</button>
            </div>

        </div>

        }



        </>
    )
}
