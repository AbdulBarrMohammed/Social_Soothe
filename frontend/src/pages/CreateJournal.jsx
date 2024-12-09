import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect } from "react"

export function CreateJournal() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [mood, setMood] = useState('happy')
    const [moodModal, setMoodModal] = useState(true);
    const [formModal, setFormModal] = useState(false);
    const [currCoins, setCurrCoins] = useState(-1);

    const navigate = useNavigate()

    // get user coin amount
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

    async function handleJournalSubmit(e) {
        e.preventDefault()


        //close mood modal
        setFormModal(false)

        //add journal to database
        const response = await fetch(`http://localhost:8000/journals/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, title, content, mood})

         })

          // add two to current coin amount
          let coins = currCoins + 2
          try {
              const response = await fetch(`http://localhost:8000/user/update`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({coins, email})
              })
          } catch(err) {
              console.log(err)
        }

        //navigate back to journals
        navigate('/journals');
        window.location.reload();
    }


    function submitModal() {
        /*open mood modal and keep form modal closed */
        setFormModal(true)
        setMoodModal(false)

    }

    return (
        <>
        {authToken &&

            moodModal &&
                <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center p-20  px-40 h-screen  md:h-fit sm:h-fit">

                    <div className="bg-white py-5 rounded-2xl flex flex-col gap-5 items-center px-5">

                        <div className="flex justify-around gap-10 sm:flex sm:flex-wrap">
                            <button onClick={() => navigate(-1)} className="font-bold text-2xl"> &times; </button>
                            <p className="text-center font-bold text-xl">{`How are you feeling today?:  ${mood}`}</p>

                        </div>

                        <div className="flex flex-wrap gap-y-5 gap-x-16 items-center justify-center sm:gap-x-5">
                                <div onClick={() => setMood("sad")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-64 bg-emojiSad rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/sad.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiSadWord">Sad</p>
                                </div>
                                <div onClick={() => setMood("happy")} className="cursor-pointer flex flex-col items-center gap-2  justify-center h-64 w-64 bg-emojiHappy rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/smile.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiHappyWord">Happy</p>
                                </div>
                                <div onClick={() => setMood("angry")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-64 bg-emojiAngry rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/angry.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiAngryWord">Angry</p>
                                </div>
                                <div onClick={() => setMood("worried")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-64 bg-emojiWorried rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/sad-2.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiWorriedWord">Worried</p>
                                </div>
                                <div onClick={() => setMood("embarrassed")} className="cursor-pointer flex flex-col items-center gap-2 justify-center h-64 w-64 bg-emojiEmbarrassed rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/tired.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiEmbarrassedWord">Embarrassed</p>
                                </div>
                                <div onClick={() => setMood("stressed")} className="cursor-pointer flex flex-col items-center gap-2  justify-center h-64 w-64 bg-emojiStressed rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/nervous.png" className="h-28"/>
                                    <p className="text-lg font-semibold text-emojiStressedWord">Stressed</p>
                                </div>

                        </div>
                        <button className="bg-[#4470AD] text-white p-5 rounded-full text-sm font-bold shadow-md"onClick={submitModal}>Submit</button>

                    </div>

                </div>


            }

            { formModal &&
            <div className="flex flex-col p-10">
                <div className="py-5 flex flex-col">
                    <form onSubmit={handleJournalSubmit} className="flex flex-col gap-5">
                        <input className="font-bold text-2xl" onChange={(e) => setTitle(e.target.value)} maxLength={15} required placeholder="Title"/>
                        <textarea className="text-xl h-96 border rounded-lg p-2" onChange={(e) => setContent(e.target.value)} maxLength={1000} required placeholder={`Why are you feeling ${mood}...`}/>
                        <div>
                            <button type="submit" className="bg-[#4470AD] text-white  p-5 rounded-full text-sm font-bold shadow-md">Add entry</button>
                        </div>

                    </form>
                </div>

            </div>
            }

        </>
    )
}
