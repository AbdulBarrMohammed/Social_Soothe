import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { Flower } from "../components/Flower";


export function SocialInteractions() {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [flowers, setFlowers] = useState([])
    const [currId, setCurrId] = useState("")
    const [openModal, setOpenModal] = useState(false)


    //const navigate = useNavigate()

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:8000/tree/flowers/${email}`)
            const data = await res.json();
            setFlowers(data)
            console.log(data)
            //setJournals(prevArray => [...prevArray, data[0]])
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])


    function handleClick(id) {
        setCurrId(id)
        setOpenModal(true)




    }



    return (


        <>

                {
                    openModal &&
                        <div className=" fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">

                            <div className="bg-white px-10 py-5 rounded-2xl flex flex-col gap-8">

                                <p>This is a modal the curr id is --- {currId}</p>


                            </div>

                        </div>
                }
                    <div className="flex flex-col items-center justify-around pt-10 p-10 gap-1 bg-[#CCDBEE] h-screen">
                        <div className=" h-96 w-4/5 relative">
                            {flowers.map((flower) => {
                                        return (
                                        <div onClick={() => handleClick(flower.id)} className={`flex items-center justify-center absolute rounded-full h-7 w-7 shadow-md`}
                                            style={{
                                                backgroundColor: flower.color,
                                                left: `${flower.x}px`, // Use pixels or a specific unit as needed
                                                top: `${flower.y}px`,  // Use pixels or a specific unit as needed
                                            }}
                                            >

                                        </div>
                                        )
                                    })
                                }
                        </div>
                        <img src="../src/assets/bark.png" className="h-80"/>
                        <Link to={`/createFlower`} className="absolute top-48 right-10 rounded-full h-20 w-20 cursor-pointer bg-[#eeeeee] p-5 items-center justify-center">
                            Add flower
                        </Link>


                    </div>


        </>
    )
}
