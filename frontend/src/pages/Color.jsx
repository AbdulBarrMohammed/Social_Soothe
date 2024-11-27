

export function Color({color, index, currColorIndex, setCurrColorIndex}) {


     async function buyBtn() {
            if (sounds) {
                sounds.map((soundObj) => {
                    if (audioSrc.title == soundObj.name) {
                        alert("You already brought this item");
                        window.location.reload();

                    }

                })
            }

            const currPrice = audioSrc.price

            if (currPrice > currCoins) {
                console.log("You do not have enough leafs")
                console.log(currPrice, currCoins)
            }
            else {
                //subract price from current leafs
                const coins = Number(currCoins) - Number(audioSrc.price)

                //add new leaf price to database
                try {
                    const response = await fetch(`http://localhost:8000/user/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({coins, email})
                    })

                    const name = audioSrc.title
                    const src = audioSrc.wavSound
                    const responseSound = await fetch(`http://localhost:8000/sounds/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email, name, src})
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

                    {/* <div className="h-10 w-10 bg-[#7444AD]"></div>
                    <div className="h-10 w-10 bg-[#8A68BE]"></div>
                    <div className="h-10 w-10 bg-[#B499D7]"></div>
                    <div className="h-10 w-10 bg-[#E2CCEE]"></div>
                    <div className="h-10 w-10 bg-[#422367]"></div>*/}



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
