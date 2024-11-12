import { useEffect } from "react";
import { questions } from "./questionsData"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"


export function CreateFlower() {

    let [index, setIndex] = useState(0);
    const [ques, setQues] = useState(questions[index])
    const [showQuestion, setShowQuestions] = useState(true)
    const [showSubmit, setShowSubmit] = useState(false)
    const [input, setInput] = useState("")
    const [questionOne, setQuestionOne] = useState("")
    const [questionTwo, setQuestionTwo] = useState("")
    const [questionThree, setQuestionThree] = useState("")
    const [questionFour, setQuestionFour] = useState("")
    const [questionFive, setQuestionFive] = useState("")
    const [questionSix, setQuestionSix] = useState("")
    const [questionSeven, setQuestionSeven] = useState("")


    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email

    const navigate = useNavigate()


    useEffect(() => {
        console.log('useeffect', questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix)

    },[ques])


    function increment() {

        if (index == 5) {
            setQuestionSix(input)
            setShowQuestions(false)
            setShowSubmit(true)
            setIndex(0)
            setQues(questions[0])

        }
        else {

            if (index == 0) {
                console.log(input, "index 0")

                setQuestionOne(input)
            }
            else if (index == 1) {
                setQuestionTwo(input)
            }
            else if (index == 2) {
                setQuestionThree(input)
            }
            else if (index == 3) {
                setQuestionFour(input)
            }
            else if (index == 4) {
                setQuestionFive(input)

            }
            setIndex(++index);
            setQues(questions[index])

        }
        setInput("")


    }

    async function submitAnswers() {

        //add flower to database
        const x = Math.random() * 75;
        const y = Math.random() * 75;
        const response = await fetch(`http://localhost:8000/flowers/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, x, y})

         })

         if (response.ok) { // if response is successful
            const data = await response.json();
            console.log('Flower created successfully frontend:', data);
            // Navigate back to tree of flowers page
            navigate('/socialInteractions');
          } else {
            // Handle error
            console.error("Failed to create flower");
          }

    }




    return (
        <>

                <div className=" inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">

                 {showQuestion &&

                        <div className="bg-white rounded-xl p-10 flex flex-col gap-5 w-1/2">


                            <div className="flex gap-2 w-4/4">
                                <h1>{index + 1}.</h1>
                                <h1>{ques}</h1>

                            </div>
                                <textarea value={input} onChange={(e) => setInput(e.target.value)} className="border h-40" required/>

                                <div className="flex justify-between">
                                <button onClick={() => increment()}>Next</button>
                            </div>

                         </div>

                 }

                 {showSubmit &&

                    <div className="bg-white rounded-xl p-10 flex flex-col gap-5 w-1/2">
                        <button onClick={() => submitAnswers()}>Submit</button>
                    </div>

                 }

                </div>


        </>
    )

}
