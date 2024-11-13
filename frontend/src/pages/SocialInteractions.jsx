import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { Flower } from "../components/Flower";
import { useParams } from "react-router-dom";


export function SocialInteractions() {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [flowers, setFlowers] = useState([])
    const [currId, setCurrId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [done, setDone] = useState(false)
    const [flower, setFlower] = useState("");


    const navigate = useNavigate()

    let id = ""



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


    useEffect(() => {

        async function loadFlower() {
            try {

                const res = await fetch(`http://localhost:8000/flowers/flower/${currId}`)
                const data = await res.json();
                setDone(data.done)
                setFlower(data)
                console.log("done is curr: ", data.done)
                //setJournals(data)
                //setJournals(prevArray => [...prevArray, data[0]])
            } catch(err) {
                console.log(err)
            }
        }
        loadFlower()
    }, [currId])


    function handleClick(id) {
        setCurrId(id)
        setOpenModal(true)

    }


    function handleComplete(e) {
        setDone(e.target.checked)

    }

    async function handleSubmit(e) {
        e.preventDefault();
        let color = ""
        try {
            if (done) {
                color = "#5BA803"; // Assign the color directly to a variable
                console.log("current color first: ", color)

            } else {
                color = "#808080";
                console.log("current color second: ", color)
            }
            console.log("id", currId)



            const response = await fetch(`http://localhost:8000/flowers/flower/color/update/${currId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({currId, color ,done})})

        } catch(err) {
            console.log(err)
        }

        window.location.reload();
        setOpenModal(false)


    }

    return (


        <>

                {
                    openModal &&
                        <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">

                            <div className="bg-white px-10 py-5 rounded-2xl flex flex-col gap-8">
                                <div className="flex flex-col">
                                    <div>
                                        <p>{flower.questionOne}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <label for="completed" className="font-bold">Social Interaction completed?</label>
                                        <input type="checkbox" id="completed" name="completed" checked={done} onChange={handleComplete} />
                                    </div>

                                    <div>
                                        <Link to={`/explainEvent/${currId}`}>
                                            <p>Explain event</p>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to={`/editFlower/${currId}`}>
                                            <p>Edit flower</p>
                                        </Link>

                                    </div>
                                </div>

                                <button onClick={handleSubmit}>Done</button>

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
