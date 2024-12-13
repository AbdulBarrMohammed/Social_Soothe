
import { useEffect } from "react"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LogIn } from "../components/Login";


//NOTES:
//if user is not logged in send them to the landing page or log in page

export function Settings() {

    const [colors, setColors] = useState([]);
    const [sounds, setSounds] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const navigate = useNavigate()


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

        //Checks if color is picked and stores the color in the database in the backend
        if (color) {
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

        //Make sure a sound is picked
        if (sound) {
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

    }

    function saveChanges(){
        navigate("/journals");

    }

    return (
        <>
        {!authToken &&  <LogIn/>}

        {authToken &&

        <div className="flex flex-col px-20 pt-10 h-screen bg-[#ACC8EA] text-[#44423F] gap-10">
            <div className="pb-5">
                <h1 className="text-4xl font-bold">Account Settings</h1>

            </div>
            <div className="">
                <h1 className="text-2xl font-bold">Appearance</h1>
                <hr className="border-[#44423F] border mb-5" />
                <p className="font-bold text-xl">Choose a background color</p>
                <select onClick={(e) => handleChangeColor(e)} className="px-10 py-3 rounded-lg bg-[#6888BE] text-white shadow-md">
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
                <select onClick={(e) => handleChangeSound(e)} className="px-10 py-3 rounded-lg bg-[#6888BE] text-white shadow-md">
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
                <button className="bg-[#6888BE] rounded-xl shadow-md text-white px-10 py-3 ">delete account</button>

            </div>

            <div className="">
                {/* MAKE SURE TO NAVIGATE TO DASHBAORD WHEN FINISHED */}
                <h2 className="text-2xl font-bold">Save changes</h2>
                <button className="bg-[#6888BE] rounded-xl shadow-md text-white px-10 py-3 " onClick={saveChanges}>Save</button>
            </div>

        </div>

        }



        </>
    )
}
