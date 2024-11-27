import { Link } from "react-router-dom"
import { pageDataLeft } from "./pageData"
import { pageDataRight } from "./pageData"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useState } from "react"

export function Navbar() {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [userInfo, setUserInfo] = useState([]);
    const [coins, setCoins] = useState(0);

    //const [bgColor, setBgColor] = useState("");
    const [colors, setColors] = useState([]);
    const [darkBg, setDarkBg] = useState("");
    //let darkBg = ''

    const getData = async () => {
        try {
            const resColor = await fetch(`http://localhost:8000/user/${userEmail}`)
            const dataColor = await resColor.json();

            const resColors = await fetch(`http://localhost:8000/colors/${userEmail}`)
            const dataColors = await resColors.json();

            if (dataColor.currColor == 'Blue') {
                setDarkBg("#233C67")
            }

            else {
                setColors(dataColors)
                console.log("Current colors ", dataColors);

                    dataColors.map((c) => {
                        console.log("colors ->", c)
                        if (c.name === dataColor.currColor) {
                            console.log("We have found a bg color ", dataColor.currColor)
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
        console.log("logged out")
        removeCookie("Email");
        removeCookie("AuthToken")
        naviagte("/")
    }

    //text-[#44423F]

    return (
        <div className="flex justify-between p-2 px-5 items-center fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: darkBg }}>
            <div className='flex gap-12 items-center'>
                <Link to={"/"}><h1 className='text-2xl font-bold text-white'>Social<span className='text-3xl'>.</span>Soothe</h1> </Link>
                <ul className="flex gap-5 cursor-pointer text-white">
                        {pageDataLeft.map((page) => {
                        return (
                            <li key={page.path} className='hover:font-bold transition duration-300 ease-in-out'>
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
                            <li key={page.path} className='hover:font-bold transition duration-300 ease-in-out'>
                                <Link to={page.path}>
                                    {page.name}
                                </Link>
                            </li>

                        );

                    })

                }

                {authToken &&
                    <div className="flex gap-5">
                        <p className="flex items-center justify-center gap-2"><img src={'../src/assets/leaf.png'} className="h-5"/> {coins}</p>
                        <button onClick={handleLogout}>Log out</button>
                    </div>

                }

                {authToken &&
                                <Link to={"/journals"}>
                                    Dashboard
                                </Link>
                }

                {authToken &&
                                <Link to={"/settings"}>
                                    <img src={"../src/assets/cog.svg"} className="h-5"/>
                                </Link>
                }

            </ul>

        </div>

    )
}
