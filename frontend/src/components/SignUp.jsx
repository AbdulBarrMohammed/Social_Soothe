
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export function SignUp() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")

  console.log(cookies)


    //navigation
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch(`http://localhost:8000/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password, gender})

    })

    const data = await response.json()
    console.log(data)

    setCookie('Email', data.email)
    setCookie('AuthToken', data.token)

    navigate("/journals")




  }



  //handle submit of sign up form

  return (
   <div className= "flex items-center justify-center h-screen bg-[#ACC8EA]">
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

            <select className="p-2 rounded-sm" onChange={(e) => setGender(e.target.value)} name="gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
            </select>

            <button className="bg-[#4470AD] text-white  p-2 rounded-md text-lg font-bold shadow-md" type= "submit">Sign up</button>
          </div>

          <div className='text-center'>
            <p>Have an account? <a className='font-bold cursor-pointer' onClick={() => navigate("/logIn")}>Log in</a></p>
          </div>


        </form>
    </div>
   </div>
  )


}
