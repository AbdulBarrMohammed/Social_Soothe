import { Link } from "react-router-dom"
import { pageDataLoggedIn } from "../data/pageData"
import { useEffect } from "react"
import { useState } from "react"
import { useCookies } from "react-cookie"


export function NavbarLoggedIn() {


    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email


    //const [bgColor, setBgColor] = useState("");
    const [colors, setColors] = useState([]);
    const [semiBg, setSemiBg] = useState("");
    const [lightestBg, setLightestBg] = useState("");
    //let darkBg = ''

    const getData = async () => {
        try {
            const resColor = await fetch(`http://localhost:8000/user/${userEmail}`)
            const dataColor = await resColor.json();

            const resColors = await fetch(`http://localhost:8000/colors/${userEmail}`)
            const dataColors = await resColors.json();

            if (dataColor.currColor.toLowerCase() == 'blue') {
                setSemiBg("#4470AD")
                setLightestBg("#CCDBEE")
            }

            else {
                setColors(dataColors)

                    dataColors.map((c) => {
                        console.log("colors ->", c)
                        if (c.name === dataColor.currColor) {

                            setSemiBg(c.semiDark)
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
    //bg-[#F9F6F4]
    //rgb(68,112,173)
    return (
        <>
        {authToken &&
            <nav className='pt-12 sticky top-0 text-white z-40 shadow-md' style={{ backgroundColor: semiBg }}>
                <ul className='p-3 flex w-full items-center justify-center'>
                        {pageDataLoggedIn.map((page) => {
                            return (

                                    <Link to={page.path} className='text-lg flex items-center rounded-xl'>
                                        <div className='flex gap-2 px-10 py-1 items-center'>
                                            <img src={page.img} className='h-7'/>
                                            <li className='hover:underline underline-offset-8 decoration-4 transition-all duration-300 ease-in-out'>
                                                {page.name}
                                            </li>
                                        </div>
                                    </Link>


                            );

                        })}

                </ul>
            </nav>

        }


        </>
    )
}
