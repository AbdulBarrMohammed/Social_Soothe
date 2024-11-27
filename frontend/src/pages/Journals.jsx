
import { useState, useEffect } from "react"
import { JournalCard } from "../components/JournalCard"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { LogIn } from "../components/Login"

//import * as jwt_decode from "jwt-decode"



export function Journals() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [journals, setJournals] = useState([])
    const [user, setUser] = useState({})
    const [searchQuery, setSearchQuery] = useState("");

    //const [bgColor, setBgColor] = useState("");
    const [colors, setColors] = useState([]);
    const [lightestBg, setLightestBg] = useState("");
    //let darkBg = ''

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:8000/journals/${userEmail}`)
            const data = await res.json();

            const resColor = await fetch(`http://localhost:8000/user/${userEmail}`)
            const dataColor = await resColor.json();

            const resColors = await fetch(`http://localhost:8000/colors/${userEmail}`)
            const dataColors = await resColors.json();

            if (dataColor.currColor == 'Blue') {
                setLightestBg("#ACC8EA")
            }
            else {
                setColors(dataColors)
                console.log("Current colors ", dataColors);

                    dataColors.map((c) => {
                        console.log("colors ->", c)
                        if (c.name === dataColor.currColor) {
                            console.log("We have found a bg color ", dataColor.currColor)
                            setLightestBg(c.lightest)
                        }

                })

            }






            setJournals(data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])

    async function onSearch(event) {
        event.preventDefault()
        console.log("current curry", searchQuery)
        try {
            const res = await fetch(`http://localhost:8000/search/${searchQuery}/${userEmail}`)
            const data = await res.json();
            console.log('query data', data)
            setJournals(data)
            //setJournals(prevArray => [...prevArray, data[0]])
        } catch(err) {
            console.log(err)
        }

    }


    return (
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
                        <Link to={`/createJournal`} className="flex flex-col rounded-full h-16 w-16 cursor-pointer p-5 bg-[#eeeeee] items-center justify-center">
                                <img src="../src/assets/plus.svg" className="h-5"/>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="flex flex-wrap gap-10 justify-center items-center pb-10">

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




    )


}
