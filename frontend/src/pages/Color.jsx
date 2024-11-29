import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";

export function Color({color}) {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const email = cookies.Email
    const [currCoins, setCurrCoins] = useState(0);
    const [colors, setColors] = useState([]);


    // function to get the users colors purchased and their current coin amount
    const getAllData = async () => {
        try {

            //user color data
            const resColor = await fetch(`http://localhost:8000/colors/${email}`)
            const dataColors = await resColor.json();
            setColors(dataColors)

            //user coins data
            const resCoins = await fetch(`http://localhost:8000/user/${email}`)
            const dataCoins = await resCoins.json();
            setCurrCoins(dataCoins.coins)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllData()
    },[])

    // function to deal with user purchase of color
     async function buyBtn() {
            // check if colors exists
            if (colors) {
                colors.map((colorObj) => {

                    // if a color object has the same name as the color user wants to get, alert user that they already brought color
                    if (colorObj.name == color.name) {
                        alert("You already brought this color");
                        window.location.reload();
                    }
                })
            }

            // grab price of color purchased
            const itemPrice = color.price

            //first check if the item price is too expensive for user
            if (itemPrice > currCoins) {
                alert("You do not have enough leafs")
            }
            else {
                //subract price from current leafs
                const coins = Number(currCoins) - Number(itemPrice)

                //add new leaf price to database
                try {
                    const response = await fetch(`http://localhost:8000/user/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({coins, email})
                    })

                    // add purchased color information to backend database
                    const name = color.name
                    const dark = color.dark
                    const semiDark = color.semiDark
                    const medium = color.medium
                    const light = color.light
                    const lightest = color.lightest

                    const responseColor = await fetch(`http://localhost:8000/colors/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email, name, dark, semiDark, medium, light, lightest})
                    })

                } catch(err) {
                    console.log(err)
                }
            }

        }

    return (
        <>
            <div className="bg-[#6888BE] flex justify-between p-7 rounded-xl text-white">
                <div className="flex gap-4 items-center">
                    <p>{color.name}</p>

                    <div className="h-10 w-10" style={{ backgroundColor: color.dark }}></div>
                    <div className="h-10 w-10" style={{ backgroundColor: color.semiDark }}></div>
                    <div className="h-10 w-10" style={{ backgroundColor: color.medium }}></div>
                    <div className="h-10 w-10" style={{ backgroundColor: color.light }}></div>
                    <div className="h-10 w-10" style={{ backgroundColor: color.lightest }}></div>

                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-cente gap-2">
                        <p>{color.price}</p>
                        <img src={'../src/assets/leaf.png'} className="h-5"/>

                    </div>

                    <button onClick={buyBtn} className="border border-white bg-[#6888BE] px-10 py-2 rounded-3xl">
                        Buy
                    </button>

                </div>
            </div>
        </>
    )
}
