
import { useEffect } from "react"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function Settings() {

    const [colors, setColors] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const navigate = useNavigate()

    const getColors = async () => {
        try {
            const res = await fetch(`http://localhost:8000/colors/${email}`)
            const data = await res.json();

            setColors(data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getColors()
    },[])



    async function handleClick(color) {

        try {
            const response = await fetch(`http://localhost:8000/user/color/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({color, email})
            })
            console.log("Color pressed -> ", response)
        } catch(err) {
            console.log(err)
        }

    }

    function handleChange(e) {
        e.preventDefault()
        console.log(e.target.value)
    }

    return (
        <>
            <div className="flex flex-col px-20 pt-10 h-screen bg-[#ACC8EA] text-[#44423F]">
                <div>
                    <h1 className="text-4xl font-bold">Account Settings</h1>

                </div>
                <div>
                    <h1 className="text-2xl font-bold">Appearance</h1>
                    <hr className="border-[#44423F] border" />
                    <select onClick={(e) => handleChange(e)}>
                        <option>Choose a background color</option>
                        {colors.map((color, index) => {
                            return (
                                <option key={index}>
                                    {color.name}
                                </option>
                            );
                        })}
                    </select>



                </div>
                <div>
                    <h1 className="text-2xl font-bold">background Sounds</h1>
                    <hr className="border-[#44423F] border" />
                    <h2>Choose a background sound to play during breathing exercises</h2>

                </div>
                <div>
                    <h1 className="text-2xl font-bold">Delete account</h1>
                    <hr className="border-[#44423F] border" />
                    <button>Press to delete account</button>

                </div>

            </div>


        </>
    )
}
