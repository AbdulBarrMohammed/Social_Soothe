
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'



export function LogIn() {

  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    //navigation
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch(`http://localhost:8000/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})

    })

    const data = await response.json()
    console.log("login data below")
    console.log(data)


    setCookie('Email', data.email)
    setCookie('AuthToken', data.token)
    if (!data.detail) {
        navigate("/journals")
    }

    //window.location.reload()

    //navigate("/journals")

  }


    return (
        <div className= "flex items-center justify-center h-screen bg-[#CCDBEE]">
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-3xl font-bold py-10'>Social.Soothe</h2>
                <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <input className="p-2 w-80 rounded-sm font-medium"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} required maxLength={40}/>

                    <input className="p-2 rounded-sm font-medium"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} required maxLength={20}/>


                    <button className="bg-[#4470AD] text-white  p-2 rounded-md text-lg font-bold shadow-md" type= "submit">Log in</button>
                </div>

                <div className='text-center'>
                    <p>Dont have an account? <a className='font-bold cursor-pointer' onClick={() => navigate("/signUp")}>Log in</a></p>
                </div>


                </form>
            </div>
       </div>
    )
}
