import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect } from "react"
import { getUserCurrentColor } from "../data/dataFunctions"

export function CreateJournal() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [mood, setMood] = useState('happy')
    const [moodModal, setMoodModal] = useState(true);
    const [formModal, setFormModal] = useState(false);
    const [currLeafs, setCurrLeafs] = useState(-1);

    const [buttonsColor, setButtonColor] = useState("#6888BE");
    const [lightestBg, setLightestBg] = useState("#ACC8EA");

    const navigate = useNavigate()

    /**
         * Get leaf count for user
         * @param event
         * @return none
         */
    const getLeafs = async () => {
        try {
            const res = await fetch(`http://localhost:8000/user/${email}`)
            const data = await res.json();
            setCurrLeafs(data.coins)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getLeafs()
        getUserCurrentColor(email, setLightestBg, setButtonColor)
    },[])

    /**
         * Submits journal entry information to user database
         * @param event
         * @return none
         */
    async function handleJournalSubmit(e) {
        e.preventDefault()

        //Close mood modal
        setFormModal(false)

        //Add journal to database
        const response = await fetch(`http://localhost:8000/journals/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, title, content, mood})

         })

          //Add two to current coin amount
          let coins = currLeafs + 2
          try {
              const response = await fetch(`http://localhost:8000/user/update`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({coins, email})
              })
          } catch(err) {
              console.log(err)
        }

        //Navigate back to journals
        navigate('/journals');
        window.location.reload();
    }

    /**
         * Open form modal and close mood modal
         * @param event
         * @return none
         */
    function submitModal() {
        setFormModal(true)
        setMoodModal(false)

    }

    return (
        <>
        {authToken &&

            moodModal &&
                <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center p-20  px-40 h-screen  md:h-fit sm:h-fit">

                    <div className="bg-white py-5 rounded-2xl flex flex-col gap-5 items-center px-2">

                        <div className="flex justify-between items-center gap-10 sm:flex sm:flex-wrap">
                            <button onClick={() => navigate(-1)} className="font-bold text-2xl"> &times; </button>
                            <p className="text-center font-bold text-xl">{`How are you feeling today?:  ${mood}`}</p>

                        </div>

                        <div className="flex flex-wrap gap-y-5 gap-x-16 items-center justify-center sm:gap-x-5">
                                <div onClick={() => setMood("sad")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-72 bg-emojiSad rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/emojiSad.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiSadWord">Sad</p>
                                </div>
                                <div onClick={() => setMood("happy")} className="cursor-pointer flex flex-col items-center gap-2  justify-center h-64 w-72 bg-emojiHappy rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/emojiHappy.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiHappyWord">Happy</p>
                                </div>
                                <div onClick={() => setMood("angry")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-72 bg-emojiAngry rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/emojiMad.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiAngryWord">Angry</p>
                                </div>
                                <div onClick={() => setMood("worried")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-72 bg-emojiWorried rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/emojiWorry.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiWorriedWord">Worried</p>
                                </div>
                                <div onClick={() => setMood("embarrassed")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-72 bg-emojiEmbarrassed rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/emojiEmbarressed.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiEmbarrassedWord">Embarrassed</p>
                                </div>
                                <div onClick={() => setMood("stressed")} className="cursor-pointer flex flex-col items-center gap-2  justify-center h-64 w-72 bg-emojiStressed rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/emojiStressed.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiStressedWord">Stressed</p>
                                </div>

                        </div>
                        <button className="text-white p-5 rounded-full text-sm font-bold shadow-md" onClick={submitModal} style={{ backgroundColor: buttonsColor }}>Submit</button>

                    </div>

                </div>


            }

            { formModal &&
            <div className="flex flex-col p-10">
                <div className="py-5 flex flex-col">
                    <form onSubmit={handleJournalSubmit} className="flex flex-col gap-5">
                        <input className="font-bold text-2xl" onChange={(e) => setTitle(e.target.value)} maxLength={20} required placeholder="Title"/>
                        <textarea className="text-xl h-96 border rounded-lg p-2" onChange={(e) => setContent(e.target.value)} maxLength={1000} required placeholder={`Why are you feeling ${mood}...`}/>
                        <div>
                            <button type="submit" className="text-white  p-5 rounded-full text-sm font-bold shadow-md" style={{ backgroundColor: buttonsColor }}>Add entry</button>
                        </div>

                    </form>
                </div>

            </div>
            }

        </>
    )
}
