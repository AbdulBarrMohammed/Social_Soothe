import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export function CreateJournal() {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [mood, setMood] = useState('happy')
    const [moodModal, setMoodModal] = useState(true);
    const [formModal, setFormModal] = useState(false);

    const navigate = useNavigate()

    async function handleJournalSubmit(e) {
        e.preventDefault()
        /* Submits new journal entry to MongoDB */

        //close mood modal
        setFormModal(false)

        //add journal to database
        const response = await fetch(`http://localhost:8000/journals/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, title, content, mood})

         })
         console.log('Response received:', response);
         if (response.ok) { // Ensure response is successful
            const data = await response.json();
            console.log('Journal created successfully:', data);
            // Navigate back to journals page after successful creation
            navigate('/journals');
          } else {
            // Handle error
            console.error("Failed to create journal entry");
          }

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
                <div className=" inset-0 bg-modalBg backdrop-blur-sm z-50 flex justify-center items-center h-screen">

                    <div className="bg-white px-10 py-5 rounded-2xl flex flex-col gap-8">

                        <div className="flex gap-16">
                            <button onClick={() => navigate(-1)} className="font-bold text-2xl"> &times; </button>
                            <p className="text-center font-bold text-xl">{`How did this social interaction make you feel?:  ${mood}`}</p>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 grid-rows-2">
                                <div onClick={() => setMood("sad")} className="cursor-pointer flex flex-col items-center gap-2 p-8 bg-emojiSad rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/sad.png" className="h-36"/>
                                    <p className="text-lg font-semibold text-emojiSadWord">Sad</p>
                                </div>
                                <div onClick={() => setMood("happy")} className="cursor-pointer flex flex-col items-center gap-2 p-8 bg-emojiHappy rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/smile.png" className="h-36"/>
                                    <p className="text-lg font-semibold text-emojiHappyWord">Happy</p>
                                </div>
                                <div onClick={() => setMood("angry")} className="cursor-pointer flex flex-col items-center gap-2 p-8 bg-emojiAngry rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/angry.png" className="h-36"/>
                                    <p className="text-lg font-semibold text-emojiAngryWord">Angry</p>
                                </div>
                                <div onClick={() => setMood("worried")} className="cursor-pointer flex flex-col items-center gap-2 p-8 bg-emojiWorried rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/sad-2.png" className="h-36"/>
                                    <p className="text-lg font-semibold text-emojiWorriedWord">Worried</p>
                                </div>
                                <div onClick={() => setMood("embarrassed")} className="cursor-pointer flex flex-col items-center gap-2 p-8 bg-emojiEmbarrassed rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/tired.png" className="h-36"/>
                                    <p className="text-lg font-semibold text-emojiEmbarrassedWord">Embarrassed</p>
                                </div>
                                <div onClick={() => setMood("stressed")} className="cursor-pointer flex flex-col items-center gap-2 p-8 bg-emojiStressed rounded-3xl hover:opacity-75 transition duration-300 ease-in-out">
                                    <img src="../src/assets/nervous.png" className="h-36"/>
                                    <p className="text-lg font-semibold text-emojiStressedWord">Stressed</p>
                                </div>

                        </div>
                        <button className="bg-[#4470AD] text-white  p-5 rounded-full text-sm font-bold shadow-md"onClick={submitModal}>Submit</button>

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
