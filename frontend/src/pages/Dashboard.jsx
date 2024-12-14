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

            if (dataColor.currColor.toLowerCase() == 'blue') {
                setLightestBg("#ACC8EA")
                setButtonColor("#6888BE")
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
            <div className="flex flex-col px-20 py-10 h-screen" style={{ backgroundColor: lightestBg }}>
                <p>This is a dashbaord</p>
                <PieChart />
                <h1>Your social standing</h1>
                <img src={socialStanding.img} className="h-28 w-28"/>
                <p>{socialStanding.text}</p>
            </div>
        </>
    )
}
