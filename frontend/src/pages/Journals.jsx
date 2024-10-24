
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

    const getData = async () => {
        try {
            console.log('running...')
            const res = await fetch(`http://localhost:8000/journals/${userEmail}`)
            const data = await res.json();
            console.log(data)
            setJournals(data)
            //setJournals(prevArray => [...prevArray, data[0]])
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])


    return (
        <>
            {!authToken &&  <LogIn/>}
            {authToken &&
                <div className="flex flex-col bg-[#CCDBEE] h-screen pb-10">

                    <h1 className="text-2xl py-10 font-bold text-center">Journal Entries</h1>

                    <div className="flex justify-center">
                        <div className="flex flex-wrap gap-5">

                            {journals.map((journal) => {
                                    return (
                                        <JournalCard journal={journal}/>
                                    )
                                })
                            }
                            <Link to={`/createJournal`} className="flex flex-col rounded-3xl cursor-pointer bg-[#eeeeee] p-5 items-center justify-center">
                                <img src="../src/assets/plus.svg" className="h-10"/>
                            </Link>



                        </div>

                </div>
            </div>


            }

        </>




    )


}
