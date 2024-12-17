import { PieChart } from "./Pie";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";


export function Dashboard() {

    const treeLength = 0;
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email

    const [lightestBg, setLightestBg] = useState("");
    const [buttonsColor, setButtonColor] = useState("#6888BE");
    const [userEmail, setUserEmail] = useState("");



    const [socialStanding, setSocialStanding] = useState({
        img: '../../src/assets/icons8-seed-64.png',
        text: 'Seed'
    })

    async function getTree() {

        try {
            const res = await fetch(`http://localhost:8000/tree/flowers/${email}`)
            const data = await res.json();

            console.log('data length',  data.length)
            if (data.length >= 22 && data.length < 100) {
                const newData = {img : '../../src/assets/icons8-sprout-48.png', text: 'Sprouting Plant'}
                setSocialStanding(newData)
                console.log("changing the social data")

            }
            else if (data.length >= 100) {
                const newData = {img : '../../src/assets/icons8-sunflower-64.png', text: 'Social Sprout Flower'}
                setSocialStanding(newData)
                console.log("changing the social data")
            }
            else {

            }


        } catch(err) {
            console.log(err)
        }



    }

    useEffect(() => {
        getTree()
    }, [])



    const getData = async () => {

        try {

            const resColor = await fetch(`http://localhost:8000/user/${email}`)
            const dataColor = await resColor.json();

            const resColors = await fetch(`http://localhost:8000/colors/${email}`)
            const dataColors = await resColors.json();



            //get index of @ symbol
            const atSymbolIndex = email.indexOf("@");

            //remove @ symbol and just include the user email name
            const editEmail = email.substring(0, atSymbolIndex)
            console.log("edit email", editEmail)
            setUserEmail(editEmail)



            if (dataColor.currColor.toLowerCase() == 'blue') {
                setLightestBg("#ACC8EA")
                setButtonColor("#4470AD")
            }
            else {

                //check for current user color in users purchased colors to set chosen background color
                dataColors.map((c) => {
                    if (c.name === dataColor.currColor) {
                        setLightestBg(c.lightest)
                        setButtonColor(c.semiDark)
                    }
                })
            }

        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <>
            <div className="flex flex-col px-20 gap-10 pt-5 h-full" style={{ backgroundColor: lightestBg }}>

                <div className="flex justify-start items-center gap-5">
                    <div>
                        <img src={"../src/assets/breeze.png"} className="h-20"/>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-3xl">Welcome back <span className="font-bold">{userEmail}</span></h1>
                        <p>Below is your recent activiy information</p>
                    </div>
                </div>



                <div className="grid gap-4 grid-cols-2 grid-rows-2 mb-10">
                    <div className="flex flex-col items-start justify-start p-5 rounded-3xl bg-[url('../src/assets/landscape.jpg')] bg-no-repeat bg-cover bg-bottom">
                        TEST
                    </div>
                    <div className="grid gap-4 grid-cols-2 grid-rows-2">
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/leaf-2.png"/>
                            <p className="text-2xl"> 17 <span>Leafs Earned</span></p>

                        </div>
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/camellia.png"/>
                            <p className="text-2xl"> 17 <span>Tree flowers</span></p>

                        </div>
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/scrapbook.png"/>
                            <p className="text-2xl"> 10 <span>Journal Entries</span></p>
                        </div>
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/gold-medal.png"/>
                            <p className="text-2xl"> 17 <span>Awards Earned</span></p>
                        </div>
                    </div>

                    <div className="bg-emojiSad shadow-md flex flex-col items-center justify-center rounded-3xl">
                        <PieChart />
                    </div>

                    <div className="bg-emojiSad shadow-md flex gap-24 py-5 justify-center rounded-3xl">


                        <img src={socialStanding.img} className="h-60 w-60"/>
                        <p>{socialStanding.text}</p>

                    </div>

                </div>

            </div>
        </>
    )
}
