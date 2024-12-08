import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export function SelectedJournal() {
    const [journal, setJournal] = useState({})
    const [stringDate, setStringDate] = useState("")
    const [formModal, setFormModal] = useState(false);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    //Grabs id from clicked journal parameters
    let params = useParams()
    let id = params.id


    useEffect(() => {

        /**
         * Gets users current journal entries in the database
         * @param none
         * @return none
         */
        async function loadJournal() {
            try {
                const res = await fetch(`http://localhost:8000/journals/journal/${id}`)
                const data = await res.json();
                setJournal(data)

                //Grabs title and content of journal to be able to change latter
                setTitle(data.title)
                setContent(data.content)
            } catch(err) {
                console.log(err)
            }
        }
        loadJournal()
    }, [id])

    /**
     * Deletes journal from users journal database
     * @param none
     * @return none
     */
    async function removeJournal() {
        //First checks if user wants to delete journal entry
        if (confirm("Are you sure you want to delete?")) {
            try {
                const res = await fetch(`http://localhost:8000/journals/journal/delete/${id}`)
                const data = await res.json();
            } catch(err) {
                console.log(err)
            }

            navigate("/journals");
          }
    }

    /**
     * Opens edit modal
     * @param none
     * @return none
     */
    function openEdit() {
        setFormModal(true);

    }

    /**
     * closes form modal
     * @param none
     * @return none
     */
    function closeModal() {
        setFormModal(false)
    }


    /**
     * Stores current changes made to journal when user edits it
     * @param event
     * @return none
     */
    async function handleEditJournalSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/journals/journal/update/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id, title, content})
            })
        } catch(err) {
            console.log(err)
        }
        navigate("/journals")

    }


    return (
        <div className="p-10 h-screen bg-[#CCDBEE]">
            <div className="flex flex-col gap-3">
                <header className="flex justify-between">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-3xl font-bold">{journal.title}</h1>
                        <h2 className="text-xl">{stringDate}</h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex p-3 bg-[#6888BE] text-white rounded-2xl items-center justify-center shadow-md">
                            <button onClick={() => navigate(-1)}>Back</button>
                        </div>
                        <div className="flex p-3 bg-[#6888BE] text-white rounded-2xl items-center justify-center shadow-md">
                            <button onClick={removeJournal}>delete</button>
                        </div>
                        <div className="flex p-3 bg-[#6888BE] text-white rounded-2xl items-center justify-center shadow-md">
                            <button onClick={openEdit}>edit</button>
                        </div>
                    </div>
                </header>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">You felt: </h1>
                    <h1 className="text-2xl">{journal.mood}</h1>
                </div>
                <div className="text-xl">
                    {journal.content}
                </div>
            </div>

            { formModal &&
                <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-30 flex flex-col items-center justify-center">
                    <div className="flex justify-start">
                        <div onClick={closeModal} className="cursor-pointer">close btn</div>
                    </div>

                    <div className="py-5 flex flex-col">
                        <form onSubmit={handleEditJournalSubmit} className="flex flex-col gap-5">
                            <input className="font-bold text-2xl rounded-lg p-2" onChange={(e) => setTitle(e.target.value)} value={title} maxLength={15}/>
                            <textarea className="text-xl h-96 border rounded-lg p-2" onChange={(e) => setContent(e.target.value)} value={content} maxLength={500}/>
                            <div>
                                <button type="submit" className="bg-[#4470AD] text-white  p-5 rounded-2xl text-sm font-bold shadow-md">Edit</button>
                            </div>

                        </form>
                    </div>

                </div>
            }

        </div>
    )
}
