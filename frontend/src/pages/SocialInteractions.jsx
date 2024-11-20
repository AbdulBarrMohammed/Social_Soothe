import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { questions } from "./questionsData";
import { submitAnswers } from "./questionsData";
import { increment } from "./questionsData";
import { handleColorChange } from "./questionsData";
import { deleteFlower } from "./questionsData";
import { addQuestionSeven } from "./questionsData";
import ReactConfetti from 'react-confetti';

export function SocialInteractions() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [flowers, setFlowers] = useState([])
    const [currId, setCurrId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [done, setDone] = useState(false)
    const [flower, setFlower] = useState("");
    const [questionSevenModal, setQuestionSevenModal] = useState(false);
    const [color, setColor] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const [currCoins, setCurrCoins] = useState(-1);

    //create flower
    const [showQuestion, setShowQuestions] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)
    let [index, setIndex] = useState(0);
    const [ques, setQues] = useState(questions[index])
    const [input, setInput] = useState("")

    const [questionOne, setQuestionOne] = useState("")
    const [questionTwo, setQuestionTwo] = useState("")
    const [questionThree, setQuestionThree] = useState("")
    const [questionFour, setQuestionFour] = useState("")
    const [questionFive, setQuestionFive] = useState("")
    const [questionSix, setQuestionSix] = useState("")
    const [questionSeven, setQuestionSeven] = useState("")

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:8000/tree/flowers/${email}`)
            const data = await res.json();
            setFlowers(data)
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
                setQuestionSeven(data.questionSeven)
                setColor(data.color)
                setShowConfetti(false)
            } catch(err) {
                console.log(err)
            }
        }
        loadFlower()
    }, [currId])

    const getCoins = async () => {
        try {
            const res = await fetch(`http://localhost:8000/user/${email}`)
            const data = await res.json();
            setCurrCoins(data.coins)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCoins()
    },[])


    function handleClick(id) {
        setCurrId(id)
        setOpenModal(true)
    }

    async function handleComplete(e) {
        setDone(e.target.checked)
        if (e.target.checked == true) {
            //add 10 coins to user coins
            let coins = currCoins + 5
            try {
                const response = await fetch(`http://localhost:8000/user/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({coins, email})
                })
            } catch(err) {
                console.log(err)
            }
            setShowConfetti(true)
            setTimeout(() => {
                setShowConfetti(false);
              }, 10000);
        }
        else {
            setShowConfetti(false)
        }
    }

    //show questions for creating flower
    function showQuestions(e) {
        setShowQuestions(true)
    }

    //delete flower
    function removeFlower() {
        deleteFlower(currId)
    }

    //increment each question
    function add() {
        increment(index, input, setQuestionSix, setShowQuestions, setShowSubmit, setIndex, setQues, setQuestionOne, setQuestionTwo, setQuestionThree, setQuestionFour,
            setQuestionFive, setInput)
    }

    function finish() {
        submitAnswers(email, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, setShowSubmit)
    }

    function explainEvent() {
        setQuestionSevenModal(true)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        handleColorChange(done, currId, setOpenModal)
    }

    function handleSevenSubmit() {
        addQuestionSeven(currId, color, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven,
            done, setQuestionSevenModal)
        }

    return (
        <div>
            {!authToken &&  <LogIn/>}
                {
                    openModal &&

                        <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">
                            {showConfetti && <ReactConfetti/>}
                            <div className="bg-white py-5 rounded-2xl flex flex-col gap-5">
                                <div className="flex flex-col text-xl">
                                    <div className="flex items-center justify-center font-bold text-2xl">
                                        <p>{flower.questionOne}</p>
                                    </div>
                                    <hr className="border-gray-300"/>
                                        <div className="flex gap-3 hover:bg-gray-200 px-10 py-1 cursor-pointer mt-3">
                                            <label for="completed" className="">Social Interaction completed?</label>
                                            <input type="checkbox" id="completed" name="completed" checked={done} onChange={handleComplete} />
                                        </div>

                                        <div onClick={explainEvent} className="flex gap-3 hover:bg-gray-200 px-10 py-1 cursor-pointer">
                                            <p>Explain event</p>
                                        </div>

                                        <div className="flex gap-3 hover:bg-gray-200 px-10 py-1 cursor-pointer">
                                            <Link to={`/editFlower/${currId}`}>
                                                <p className="text">Edit flower</p>
                                            </Link>
                                        </div>
                                        <div onClick={removeFlower} className="flex gap-3 hover:bg-gray-200 px-10 py-1 cursor-pointer">
                                            <p>Delete flower</p>
                                        </div>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={handleSubmit} className="py-3 px-5 bg-[#4470AD] text-white rounded-2xl shadow-md">Done</button>
                                </div>

                            </div>
                        </div>
                }
                    <div className="flex flex-col items-center pt-10 px-10 gap-1 bg-[#CCDBEE] h-screen">
                    {authToken &&
                        <>
                            <div className=" h-96 w-4/5 relative">
                                {flowers.map((flower) => {
                                            return (
                                            <div onClick={() => handleClick(flower.id)} className={`flex items-center justify-center absolute rounded-full h-7 w-7 shadow-md`}
                                                style={{
                                                    backgroundColor: flower.color,
                                                    left: `${flower.x}px`,
                                                    top: `${flower.y}px`,
                                                }}
                                                >
                                            </div>
                                            )
                                        })
                                    }
                            </div>
                            <img src="../src/assets/bark.png" className="h-60 mb-10"/>
                        </>
                    }
                        <div onClick={showQuestions} className="absolute top-48 right-10 rounded-full h-20 w-20 cursor-pointer bg-[#eeeeee] p-5 items-center justify-center">
                            Add flower
                        </div>
                    </div>

                    {showQuestion &&

                        <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">
                            <div className="bg-white rounded-xl p-10 flex flex-col gap-5 w-1/2">
                                <div className="flex gap-2 w-4/4">
                                    <h1>{index + 1}.</h1>
                                    <h1>{ques}</h1>
                                </div>
                                    <textarea value={input} onChange={(e) => setInput(e.target.value)} className="border h-40" required/>
                                    <div className="flex justify-between">
                                    <button onClick={() => add()}>Next</button>
                                </div>

                            </div>
                        </div>
                        }

                        {showSubmit &&
                            <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">
                                <div className="bg-white rounded-xl p-10 flex flex-col gap-5 w-1/2">
                                    <button onClick={() => finish()}>Submit</button>
                                </div>
                            </div>

                        }

                        {questionSevenModal &&
                            <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">
                                <div className="bg-white p-10">
                                    <form className="flex flex-col gap-5 p-10">
                                        <div>
                                            <p className="font-bold">{questions[6]}</p>
                                            <textarea className="text-xl w-1/2 h-40 border rounded-lg p-2" onChange={(e) => setQuestionSeven(e.target.value)} value={questionSeven} maxLength={500}/>
                                        </div>

                                        <button onClick={handleSevenSubmit}>done</button>

                                    </form>
                                </div>
                            </div>

                        }
        </div>
    )

}
