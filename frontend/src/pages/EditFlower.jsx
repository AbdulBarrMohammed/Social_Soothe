import { useParams } from "react-router-dom"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { questions } from "../data/questionsData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "../components/Login";
import { getUserCurrentColor } from "../data/dataFunctions";


export function EditFlower() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email

    //grabbing id from clicked flower
    let params = useParams()
    let id = params.id

    const [questionOne, setQuestionOne] = useState("")
    const [questionTwo, setQuestionTwo] = useState("")
    const [questionThree, setQuestionThree] = useState("")
    const [questionFour, setQuestionFour] = useState("")
    const [questionFive, setQuestionFive] = useState("")
    const [questionSix, setQuestionSix] = useState("")
    const [questionSeven, setQuestionSeven] = useState("")
    const [color, setColor] = useState("")
    const [done, setDone] = useState(false)
    const [isChecked, setIsChecked] = useState(false);

    const [lightestBg, setLightestBg] = useState("#ACC8EA");
    const [buttonsColor, setButtonColor] = useState("#6888BE");

    const navigate = useNavigate()

    useEffect(() => {
        getUserCurrentColor(email, setLightestBg, setButtonColor)
    })

    useEffect(() => {
        /**
         * Grabs all of users flowers in database
         * @param none
         * @return none
         */
        async function loadFlower() {
            try {
                const res = await fetch(`http://localhost:8000/flowers/flower/${id}`)
                const data = await res.json();

                //set current question data for each data
                setQuestionOne(data.questionOne)
                setQuestionTwo(data.questionTwo)
                setQuestionThree(data.questionThree)
                setQuestionFour(data.questionFour)
                setQuestionFive(data.questionFive)
                setQuestionSix(data.questionSix)
                setQuestionSeven(data.questionSeven)

                //Set users current color
                setColor(data.color)

                setDone(data.done)
                setIsChecked(data.isChecked)
            } catch(err) {
                console.log(err)
            }
        }
        loadFlower()
    }, [id])


    /**
         * Adds edited answers to each question to database
         * @param event
         * @return none
         */
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/flowers/flower/update/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id, color, questionOne,
                questionTwo,
                questionThree,
                questionFour,
                questionFive,
                questionSix,
                questionSeven, done, isChecked})
            })

        } catch(err) {
            console.log(err)
        }

        navigate("/socialTree")
    }


    return (

        <>

        {!authToken && <LogIn />}
        {authToken &&
            <div className="flex flex-col h-full px-10" style={{ backgroundColor: lightestBg }}>
                <form className="flex flex-col gap-5 p-10">
                    <div>
                        <p className="font-bold">{"Title your social event"}</p>
                        <input className="text-xl w-1/2 h-10 rounded-lg p-2" onChange={(e) => setQuestionOne(e.target.value)} value={questionOne} maxLength={500} style={{ backgroundColor: lightestBg }}/>
                    </div>
                    <div>
                        <p className="font-bold">{questions[0]}</p>
                        <textarea className="text-xl w-1/2 h-20 rounded-lg p-2" onChange={(e) => setQuestionTwo(e.target.value)} value={questionTwo} maxLength={500} style={{ backgroundColor: lightestBg }}/>
                    </div>
                    <div>
                        <p className="font-bold">{questions[1]}</p>
                        <textarea className="text-xl w-1/2 h-20 rounded-lg p-2" onChange={(e) => setQuestionThree(e.target.value)} value={questionThree} maxLength={500} style={{ backgroundColor: lightestBg }}/>
                    </div>
                    <div>
                        <p className="font-bold">{questions[2]}</p>
                        <textarea className="text-xl w-1/2 h-20 rounded-lg p-2" onChange={(e) => setQuestionFour(e.target.value)} value={questionFour} maxLength={500} style={{ backgroundColor: lightestBg }}/>
                    </div>
                    <div>
                        <p className="font-bold">{questions[3]}</p>
                        <textarea className="text-xl w-1/2 h-20 rounded-lg p-2" onChange={(e) => setQuestionFive(e.target.value)} value={questionFive} maxLength={500} style={{ backgroundColor: lightestBg }}/>
                    </div>
                    <div>
                        <p className="font-bold">{questions[4]}</p>
                        <textarea className="text-xl w-1/2 h-20 rounded-lg p-2" onChange={(e) => setQuestionSix(e.target.value)} value={questionSix} maxLength={500} style={{ backgroundColor: lightestBg }}/>
                    </div>

                    <div>
                        <button className="rounded-3xl p-5 text-white" onClick={handleSubmit} style={{ backgroundColor: buttonsColor }}>Save</button>
                    </div>

                </form>
            </div>

        }

        </>


    )

}
