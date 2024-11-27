
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

    return (
        <>
            <p>This is the settings</p>
            <p>Choose color schemes</p>
            {colors.map((color, index) => {
                return (
                    <p onClick={(e) => handleClick(color.name)}>{color.name}</p>
                    )
                })
            }
            <p onClick={(e) => handleClick("Blue")}>Blue</p>

        </>
    )
}
