import { PieChart } from "./Pie";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { getUserCurrentColor } from "../data/dataFunctions";
import { LogIn } from "../components/Login";


export function Dashboard() {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email

    const [lightestBg, setLightestBg] = useState("");
    const [buttonsColor, setButtonColor] = useState("#6888BE");
    const [userEmail, setUserEmail] = useState("");

    const [journalCount, setJournalCount] = useState(0);
    const [flowerCount, setFlowerCount] = useState(0);
    const [leafCount, setLeafCount] = useState(0);
    const [awardCount, setAwardCount] = useState(0);

    const [timeBg, setBgTime] = useState("");
    const [timeText, setTimeText] = useState("");

    const [socialStanding, setSocialStanding] = useState({
        img: '../../src/assets/icons8-seed-64.png',
        text: 'Seed'
    })

    /**
         * Gets user's tree count data
         * @param none
         * @return none
         */
    async function getTreeData() {

        try {
            const res = await fetch(`http://localhost:8000/tree/flowers/${email}`)
            const data = await res.json();

            setFlowerCount(data.length);
            if (data.length >= 22 && data.length < 100) {
                const newData = {img : '../../src/assets/green-tea.png', text: 'Social Sprouting Plant'}
                setSocialStanding(newData)

            }
            else if (data.length >= 100) {
                const newData = {img : '../../src/assets/rose.png', text: 'Social Sprout Flower'}
                setSocialStanding(newData)
            }
            else {
                const newData = {img : '../../src/assets/seed-bag.png', text: 'Social Seed'}
                setSocialStanding(newData)
            }


        } catch(err) {
            console.log(err)
        }

    }

    /**
         * Gets user's data to display on their dasboard
         * @param none
         * @return none
         */
    const getData = async () => {

        try {
            const resColors = await fetch(`http://localhost:8000/colors/${email}`)
            const dataColors = await resColors.json();

            const resSounds = await fetch(`http://localhost:8000/sounds/${email}`)
            const dataSounds = await resSounds.json();

            //Journal data to get journal entry count
            const res = await fetch(`http://localhost:8000/journals/${email}`)
            const journalData = await res.json();
            setJournalCount(journalData.length)

            //Leaf count
            const resLeaf = await fetch(`http://localhost:8000/user/${email}`)
            const dataLeaf = await resLeaf.json();
            setLeafCount(dataLeaf.coins);

            //Award count
            const colorCount = dataColors.length;
            const soundCount = dataSounds.length;
            const totalAwards = colorCount + soundCount;
            setAwardCount(totalAwards)

            //get index of @ symbol
            const atSymbolIndex = email.indexOf("@");

            //remove @ symbol and just include the user email name
            const editEmail = email.substring(0, atSymbolIndex)
            setUserEmail(editEmail)


        } catch(err) {
            console.log(err)
        }
    }

     /**
         * Gets time of day to display different images matching the time of day
         * @param none
         * @return none
         */
    async function getTimeOfDay() {
        const date = new Date();
            let time = date.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
          });
          console.log(time >= "");

        //Sunrise time
        if (time > "06:00" && time < "12:00" && time.includes("AM") ) {
                setBgTime("url(../src/assets/sunrise.jpg)");
                setTimeText("Good morning");
          }

        //Afternoon time
        else if ( time >= "01:00" && time < "05:00" && time.includes("PM") ) {
            setBgTime("url(../src/assets/landscape.jpg)");
            setTimeText("Good afternoon");
        }

        else if (time >= "12:00" && time < "12:59" && time.includes("PM")) {
            setBgTime("url(../src/assets/landscape.jpg)");
            setTimeText("Good afternoon");
        }

        //Evening time
        else if (time > "05:00" && time < "11:00" && time.includes("PM")) {
            setBgTime("url(../src/assets/sunset.jpg)");
            setTimeText("Good evening");
          }

        //Night time
        else {
            setBgTime("url(../src/assets/night.jpg)");
            setTimeText("Good night");
          }

    }

    useEffect(() => {
        getData()
        getTimeOfDay()
        getTreeData()
        getUserCurrentColor(email, setLightestBg, setButtonColor)
    },[])

    return (
        <>

        {!authToken && <LogIn/>}

        {authToken &&

            <div className="flex flex-col px-20 gap-10 pt-5 h-full" style={{ backgroundColor: lightestBg }}>

                <div className="flex justify-start items-center gap-5">
                    <div>
                        <img src={"../src/assets/breeze.png"} className="h-20"/>
                    </div>
                    <div className="flex flex-col text-[#44423F]">
                        <h1 className="text-3xl">Welcome back <span className="font-bold">{userEmail}</span></h1>
                        <p>Below is your recent activiy information</p>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-2 grid-rows-2 mb-10">

                    <div className="flex flex-col items-start justify-start p-5 rounded-3xl bg-no-repeat bg-cover bg-bottom" style={{ backgroundImage: timeBg}}>
                    <p className="text-3xl p-3">{timeText}</p>
                    </div>
                    <div className="grid gap-4 grid-cols-2 grid-rows-2">
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/leaf-2.png"/>
                            <p className="text-2xl"> {leafCount} <span>Leafs Earned</span></p>

                        </div>
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/camellia.png"/>
                            <p className="text-2xl"> {flowerCount} <span>Tree flowers</span></p>

                        </div>
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/scrapbook.png"/>
                            <p className="text-2xl"> {journalCount} <span>Journal Entries</span></p>
                        </div>
                        <div className="flex flex-col gap-2 items-start justify-center rounded-3xl pl-5 text-white" style={{ backgroundColor: buttonsColor }}>
                            <img className="h-14"src="../src/assets/gold-medal.png"/>
                            <p className="text-2xl"> {awardCount} <span>Awards Earned</span></p>
                        </div>
                    </div>

                    <div className="bg-white flex gap-5 justify-center rounded-3xl p-5 text-white" style={{ backgroundColor: buttonsColor }}>
                        <PieChart />
                        <h1 className="text-3xl font-bold pt-5">Daily Moods</h1>
                    </div>

                    <div className=" bg-white flex flex-wrap gap-5 p-5 pt-10 justify-center rounded-3xl text-white" style={{ backgroundColor: buttonsColor }}>

                        <img src={socialStanding.img} className="h-60 w-60"/>
                        <div className="flex flex-col gap-2 text-white">
                            <p className="text-xl">{socialStanding.text}</p>
                            <h1 className="text-3xl font-bold">Your social standing</h1>

                        </div>


                    </div>

                </div>

            </div>


            }


        </>
    )
}
