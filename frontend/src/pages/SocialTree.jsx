
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { questions } from "../data/questionsData";
import { submitAnswers } from "../data/questionsData";
import { increment } from "../data/questionsData";
import { handleColorChange } from "../data/questionsData";
import { deleteFlower } from "../data/questionsData";
import { addQuestionSeven } from "../data/questionsData";
import ReactConfetti from 'react-confetti';
import { LogIn } from "../components/Login";
import { getUserCurrentColor } from "../data/dataFunctions";
import { getLeafCount } from "../data/dataFunctions";

export function SocialTree() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [flowers, setFlowers] = useState([])
    const [currId, setCurrId] = useState("")
    const [openFlowerModal, setOpenFlowerModal] = useState(false)
    const [done, setDone] = useState(false)
    const [flower, setFlower] = useState("");
    const [questionSevenModal, setQuestionSevenModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [currLeafs, setCurrLeafs] = useState(-1);
    const [isChecked, setIsChecked] = useState(false);

    //create flower
    const [showQuestion, setShowQuestions] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)
    let [index, setIndex] = useState(0);
    const [ques, setQues] = useState(questions[index])
    const [input, setInput] = useState("")

    //Flower questions
    const [questionOne, setQuestionOne] = useState("")
    const [titleQuestion, setTitleQuestion] = useState(false);
    const [questionTwo, setQuestionTwo] = useState("")
    const [questionThree, setQuestionThree] = useState("")
    const [questionFour, setQuestionFour] = useState("")
    const [questionFive, setQuestionFive] = useState("")
    const [questionSix, setQuestionSix] = useState("")
    const [questionSeven, setQuestionSeven] = useState("")

    //Page color schemes
    const [lightestBg, setLightestBg] = useState("#ACC8EA");
    const [buttonsColor, setButtonColor] = useState("#6888BE");




     /**
    * Loads user flowers to their tree
    * @param none
    * @return none
    */
    async function loadFlowers() {
        try {
            const resFlowers = await fetch(`http://localhost:8000/tree/flowers/${email}`)
            const dataFlowers = await resFlowers.json();
            if (dataFlowers) {
                setFlowers(dataFlowers)
            }

        } catch(err) {
            console.log(err)
        }
    }

    /**
         * Gets selected flower and sets its information
         * @param none
         * @return none
         */
    async function loadFlower() {
        try {
            const res = await fetch(`http://localhost:8000/flowers/flower/${currId}`)
            const data = await res.json();
            setDone(data.done)
            setFlower(data)
            setQuestionSeven(data.questionSeven)
            setShowConfetti(false)
            setIsChecked(data.isChecked)

        } catch(err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getUserCurrentColor(email, setLightestBg, setButtonColor)
        getLeafCount(email, setCurrLeafs)
        loadFlowers()

    }, [])


    useEffect(() => {
        loadFlower()
    }, [currId])




     /**
    * Sets current id of clicked flower and opens the flowers information modal
    * @param id (string)
    * @return none
    */
    function handleFlowerClick(id) {
        setCurrId(id)
        setOpenFlowerModal(true)
    }


     /**
    * Adds more leafs to users leaf count if they have clicked the checkbox
    * @param event
    * @return none
    */
    async function handleComplete(e) {
        setDone(e.target.checked)

        //first check if the user has already pressed the check in the past
        if (!isChecked) {

            if (e.target.checked == true) {
                //add 5 coins to user coins
                let coins = currLeafs + 5
                try {
                    const response = await fetch(`http://localhost:8000/user/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({coins, email})
                    })

                    ///update the flower is be checked is true
                    const checked = true
                    setIsChecked(true)
                    const responseChecked = await fetch(`http://localhost:8000/flowers/flower/check/update/${currId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({currId, checked})
                    })
                } catch(err) {
                    console.log(err)
                }
                setShowConfetti(true)
                setTimeout(() => {
                    setShowConfetti(false);
                  }, 10000);
            }

        }

    }

     /**
    * Deletes flower from user flowers database
    * @param none
    * @return none
    */
    function removeFlower() {
        deleteFlower(currId)
    }

     /**
    * Increment between each question
    * @param none
    * @return none
    */
    function add() {
        increment(index, input, setQuestionSix, setShowQuestions, setShowSubmit, setIndex, setQues, setQuestionTwo, setQuestionThree, setQuestionFour,
            setQuestionFive, setInput)
    }


     /**
    * Adds users answers to their flower database
    * @param none
    * @return none
    */
    function finish() {
        submitAnswers(email, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, setShowSubmit)
    }

     /**
    * Open question seven modal
    * @param none
    * @return none
    */
    function explainEvent() {
        setQuestionSevenModal(true)

    }

     /**
    * Changes flower color based on if user completed has checked the check box
    * @param event
    * @return none
    */
    async function handleDoneSubmit(e) {
        e.preventDefault();
        handleColorChange(done, currId, setOpenFlowerModal)
    }

     /**
    * Add question seven to user flower database
    * @param none
    * @return none
    */
    function handleSevenSubmit() {
        addQuestionSeven(currId, questionSeven, setQuestionSevenModal)
    }

     /**
    * Close questions modal
    * @param none
    * @return none
    */
    function closeQuestions() {
        setShowQuestions(false);
    }

     /**
    * Close title question modal and opens the rest of the questions modal
    * @param none
    * @return none
    */
    function handleOneSubmit() {
        setTitleQuestion(false);
        setShowQuestions(true)

    }

    /**
    * Open question one modal
    * @param none
    * @return none
    */
    function showQuestionOne() {
        setTitleQuestion(true);
    }

    /**
    * Closes title question modal
    * @param none
    * @return none
    */
    function closeTitleQuestion() {
        setTitleQuestion(false)
        setQuestionOne("")
    }



    return (
        <div>
            {!authToken &&  <LogIn/>}
                {
                    openFlowerModal &&

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
                                    <button onClick={handleDoneSubmit} className="py-3 px-5 text-white rounded-2xl shadow-md" style={{ backgroundColor: buttonsColor }}>Done</button>
                                </div>

                            </div>
                        </div>
                }
                    <div className="flex flex-col items-center pt-10 px-10 gap-1 h-screen" style={{ backgroundColor: lightestBg }}>
                    {authToken &&
                        <>
                            <div className=" h-96 w-4/5 relative">
                                {flowers.map((flower) => {
                                            return (
                                            <div onClick={() => handleFlowerClick(flower.id)} className={`flex items-center justify-center absolute rounded-full h-7 w-7 shadow-md`}
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
                            <img src="../src/assets/rb_1364.png" className="h-60 mb-10"/>
                        </>
                    }

                    {authToken &&
                        <div onClick={showQuestionOne} className="absolute top-10 right-10 rounded-full h-14 w-14 cursor-pointer bg-[#eeeeee] p-4 flex items-center justify-center">
                            <img src="../src/assets/camellia.png"/>
                        </div>

                    }

                    </div>

                    {titleQuestion  &&
                        <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex flex-col items-center justify-center h-screen">
                            <div className="bg-white p-2 rounded-xl  flex flex-col items-center justify-center">
                                <form className="flex flex-col gap-5 p-5 items-center justify-center">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="flex gap-10">
                                            <p className="font-bold text-xl cursor-pointer" onClick={closeTitleQuestion}>&#x2715;</p>
                                            <p className="font-bold text-center">Title your social event</p>
                                        </div>

                                        <input className="text-xl w-full h-10 border rounded-lg p-2" onChange={(e) => setQuestionOne(e.target.value)} value={questionOne} maxLength={10}/>
                                    </div>

                                    <button onClick={handleOneSubmit}>Next</button>

                                </form>
                            </div>
                        </div>
                    }

                    {showQuestion &&

                        <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">
                            <div className="bg-white rounded-xl p-10 flex flex-col gap-5 w-1/2">
                                <div className="flex justify-between w-4/4 font-bold text-lg">
                                    <div className="flex gap-5">
                                        <h1>{index + 1}.</h1>
                                        <h1>{ques}</h1>
                                    </div>

                                    <p className="cursor-pointer font-bold text-xl"onClick={closeQuestions}>&#x2715;</p>
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
                                <div className="bg-white p-5 flex items-center justify-center rounded-xl">
                                    <form className="flex flex-col gap-5 p-5 items-center">
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <p className="font-bold">{questions[5]}</p>
                                            <textarea className="text-xl h-40 border rounded-lg p-2" onChange={(e) => setQuestionSeven(e.target.value)} value={questionSeven} maxLength={500}/>
                                        </div>
                                        <div>
                                            <button className="py-3 px-5 text-white rounded-2xl shadow-md" onClick={handleSevenSubmit} style={{ backgroundColor: buttonsColor }}>done</button>
                                        </div>

                                    </form>
                                </div>
                            </div>

                        }
        </div>
    )

}
