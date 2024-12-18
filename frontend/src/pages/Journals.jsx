
import { useState, useEffect } from "react"
import { JournalCard } from "../components/JournalCard"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { LogIn } from "../components/Login"

import { getJournalData } from "../data/dataFunctions"
import { getUserCurrentColor } from "../data/dataFunctions"


export function Journals() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [journals, setJournals] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    const [colors, setColors] = useState([]);
    const [lightestBg, setLightestBg] = useState("");
    const [buttonsColor, setButtonColor] = useState("#6888BE");


    //Get user current color to set background
    useEffect(() => {
        getUserCurrentColor(userEmail, setLightestBg, setButtonColor)
    }, [])


    useEffect(() => {
        getJournalData(userEmail, setJournals)
    },[])

    // function to query search for journals based on title
    async function onSearch(event) {
        event.preventDefault()
        try {
            const res = await fetch(`http://localhost:8000/search/${searchQuery}/${userEmail}`)
            const data = await res.json();
            setJournals(data)
        } catch(err) {
            console.log(err)
        }

    }

    return (
        <>

            <div className=" h-screen" style={{ backgroundColor: lightestBg }}>
            {!authToken &&  <LogIn/>}

                {authToken &&
                    <div className="flex flex-col items-center" style={{ backgroundColor: lightestBg }}>

                        <div className="flex items-center gap-10">
                            <h1 className="text-2xl py-10 font-bold text-center w-80">Journal Entries</h1>
                            <form onSubmit={onSearch} className="w-full">
                            <input
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    className="h-10 w-full rounded-3xl p-5" placeholder="Search journal title..."/>
                            </form>
                            <Link to={`/createJournal`} className="flex flex-col rounded-full h-10 w-10 cursor-pointer p-5 items-center justify-center text-white" style={{ backgroundColor: buttonsColor }}>
                                    +
                            </Link>
                        </div>

                        <div className="flex justify-center items-center">
                            <div className="flex flex-wrap gap-10 justify-center items-center pb-10 px-10">

                                {journals.map((journal) => {
                                        return (
                                            <JournalCard journal={journal}/>
                                        )
                                    })
                                }

                            </div>

                    </div>
                </div>

                }

            </div>
        </>


    )


}
