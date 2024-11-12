
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
            const res = await fetch(`http://localhost:8000/journals/${userEmail}`)
            const data = await res.json();
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
        <div className="bg-[#CCDBEE] h-screen">
            {!authToken &&  <LogIn/>}
            {authToken &&
                <div className="flex flex-col bg-[#CCDBEE] justify-center items-center">

                    <h1 className="text-2xl py-10 font-bold text-center">Journal Entries</h1>

                    <div className="flex justify-center items-center">
                        <div className="flex flex-wrap gap-10 justify-center items-center pb-10">

                            {journals.map((journal) => {
                                    return (
                                        <JournalCard journal={journal}/>
                                    )
                                })
                            }
                            <Link to={`/createJournal`} className="flex flex-col rounded-full h-20 w-20 cursor-pointer bg-[#eeeeee] p-5 items-center justify-center">
                                <img src="../src/assets/plus.svg" className="h-10"/>
                            </Link>



                        </div>

                </div>
            </div>


            }

        </div>




    )


}
