
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { questions } from "./questionsData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function ExplainEvent() {

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



    const navigate = useNavigate()

    useEffect(() => {

        async function loadFlower() {
            try {
                console.log(id);
                const res = await fetch(`http://localhost:8000/flowers/flower/${id}`)
                const data = await res.json();

                setQuestionOne(data.questionOne)
                setQuestionTwo(data.questionTwo)
                setQuestionThree(data.questionThree)
                setQuestionFour(data.questionFour)
                setQuestionFive(data.questionFive)
                setQuestionSix(data.questionSix)
                setQuestionSeven(data.questionSeven)
                setColor(data.color)
                setDone(data.done)
            } catch(err) {
                console.log(err)
            }
        }
        loadFlower()
    }, [id])


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
                questionSeven, done})
            })

        } catch(err) {
            console.log(err)
        }

        navigate("/socialInteractions")
    }



    return (
        <div className="bg-[#CCDBEE] h-screen">
            <form className="flex flex-col gap-5 p-10">
                <div>
                    <p className="font-bold">{questions[6]}</p>
                    <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionSeven(e.target.value)} value={questionSeven} maxLength={500}/>
                </div>

                <button onClick={handleSubmit}>Exit</button>

            </form>
        </div>
    )
}
