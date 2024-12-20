import { Link } from "react-router-dom"
import { pageDataLeft, pageDataLoggedIn } from "../data/pageData"
import { pageDataRight } from "../data/pageData"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { getUserCurrentColor } from "../data/dataFunctions"

export function Navbar() {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [coins, setCoins] = useState(0);

    //const [bgColor, setBgColor] = useState("");
    const [colors, setColors] = useState([]);
    const [darkBg, setDarkBg] = useState("#233C67");
    //let darkBg = ''

    const getData = async () => {
        try {
            const resColor = await fetch(`http://localhost:8000/user/${userEmail}`)
            const dataColor = await resColor.json();

            const resColors = await fetch(`http://localhost:8000/colors/${userEmail}`)
            const dataColors = await resColors.json();

            if (window.location == 'http://localhost:5173/?#/' || window.location == 'http://localhost:5173/?#/resources' || window.location == 'http://localhost:5173/?#/about') {
                console.log('we are home')
                setDarkBg("#233C67")
                console.log(darkBg)
            }

            else if (dataColor.currColor.toLowerCase() == 'blue') {
                setDarkBg("#233C67")
            }

            else {
                setColors(dataColors)

                    dataColors.map((c) => {
                        if (c.name === dataColor.currColor) {
                            setDarkBg(c.dark)
                        }

                    })

            }


        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()

    },[])


    const getCoins = async () => {
        try {
            const res = await fetch(`http://localhost:8000/user/${userEmail}`)
            const data = await res.json();
            setCoins(data.coins)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCoins()
    },[])

    function handleLogout() {
        removeCookie("Email");
        removeCookie("AuthToken")
        window.location.reload(false);
        naviagte("/login")
    }

    //text-[#44423F]

    return (

        <div className="flex justify-between p-2 px-5 items-center fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: darkBg }}>
            <div className='flex gap-12 items-center'>
                <div className="flex gap-3">
                    <img src={"../src/assets/breeze.png"} className="h-9"/>
                    <Link to={"/"}><h1 className='text-2xl font-bold text-white'>Social<span className='text-3xl'>.</span>Soothe</h1> </Link>

                </div>

                <ul className="flex gap-5 cursor-pointer text-white">
                        {pageDataLeft.map((page) => {
                        return (
                            <li key={page.path} className='hover:underline underline-offset-8 decoration-4 transition-all duration-300 ease-in-out'>
                                <Link to={page.path}>
                                {page.name}
                                </Link>
                            </li>
                        )
                    })}

                </ul>
            </div>

            <ul className="flex gap-5 cursor-pointer text-white">
                {!authToken &&
                    pageDataRight.map((page) => {
                        return (
                            <li key={page.path} className='hover:underline underline-offset-8 decoration-4 transition-all duration-300 ease-in-out'>
                                <Link to={page.path}>
                                    {page.name}
                                </Link>
                            </li>

                        );

                    })

                }

                {authToken &&
                    <div className="flex gap-5">
                        <p className="flex items-center justify-center gap-2"><img src={'../src/assets/leaf-2.png'} className="h-5"/> {coins}</p>
                        <button onClick={handleLogout} className='hover:underline underline-offset-8 decoration-4 transition-all duration-300 ease-in-out'>Log out</button>
                    </div>

                }

                {authToken &&
                                <Link to={"/dashboard"} className='hover:underline underline-offset-8 decoration-4 transition-all duration-300 ease-in-out'>
                                    Dashboard
                                </Link>
                }

                {authToken &&
                                <Link to={"/settings"} className='hover:underline underline-offset-8 decoration-4 transition-all duration-300 ease-in-out'>
                                    <img src={"../src/assets/cog.svg"} className="h-5"/>
                                </Link>
                }

            </ul>

        </div>

    )
}
