import { Link } from "react-router-dom"
import { pageDataLeft } from "./pageData"
import { pageDataRight } from "./pageData"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export function Navbar() {
    let user;
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email

    function handleLogout() {
        console.log("logged out")
        naviagte("/")
    }

    //text-[#44423F]

    return (
        <div className="flex justify-between p-3 items-center bg-[#233C67] fixed top-0 left-0 right-0 z-50">
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
                    <button onClick={handleLogout}>Log out</button>
                }

                {authToken &&
                                <Link to={"/journals"}>
                                    Dashboard
                                </Link>
                }

            </ul>

        </div>

    )
}
