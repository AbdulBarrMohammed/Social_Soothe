import { useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { questions } from "./questionsData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function SelectedFlower() {

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
    const [done, setDone] = useState(false)
    const [flower, setFlower] = useState({})



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
                setFlower(data)
                setDone(data.done)
                console.log("done is curr: ", data.done)
                //setJournals(data)
                //setJournals(prevArray => [...prevArray, data[0]])
            } catch(err) {
                console.log(err)
            }
        }
        loadFlower()
    }, [id])





    const handleComplete = (e) => {

        setDone(e.target.checked)

    }

    async function handleSubmit(e) {
        e.preventDefault();
        let color = ""
        try {
            if (done) {
                color = "#5BA803"; // Assign the color directly to a variable
                console.log()

            } else {
                color = "#808080";
            }

            console.log(color)

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
        <>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col">
                    <div className="flex gap-3">
                        <label for="completed" className="font-bold">Social Interaction completed?</label>
                        <input type="checkbox" id="completed" name="completed" checked={done} onChange={handleComplete} />
                    </div>

                    <div>
                        <p>Explain how it went</p>
                    </div>
                    <div>
                        <Link to={`/editFlower/${id}`}>
                            <p>Edit flower</p>
                        </Link>

                    </div>
                </div>

                <button onClick={handleSubmit}>Exit</button>

                {/*

                    <div>
                    <p className="font-bold">{questions[0]}</p>
                    <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionOne(e.target.value)} value={questionOne} maxLength={500}/>
                </div>
                <div>
                    <p className="font-bold">{questions[1]}</p>
                    <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionTwo(e.target.value)} value={questionTwo} maxLength={500}/>
                </div>
                <div>
                    <p className="font-bold">{questions[2]}</p>
                    <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionThree(e.target.value)} value={questionThree} maxLength={500}/>
                </div>
                <div>
                    <p className="font-bold">{questions[3]}</p>
                    <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionFour(e.target.value)} value={questionFour} maxLength={500}/>
                </div>
                <div>
                    <p className="font-bold">{questions[4]}</p>
                    <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionFive(e.target.value)} value={questionFive} maxLength={500}/>
                </div>
                <div>
                    <p className="font-bold">{questions[5]}</p>
                    <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionSix(e.target.value)} value={questionSix} maxLength={500}/>
                </div>

                */}


            </form>
        </>

    )
}
