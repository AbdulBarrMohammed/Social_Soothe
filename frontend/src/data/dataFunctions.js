

/**
     * Gets all users colors and current color chosen for background
     * @param email (string), setLightestBg (function), setButtonColor (function)
     * @return none
     */
export async function getUserCurrentColor(email, setLightestBg, setButtonColor) {
    try {
        const resColor = await fetch(`http://localhost:8000/user/${email}`)
        const dataColor = await resColor.json();

        const resColors = await fetch(`http://localhost:8000/colors/${email}`)
        const dataColors = await resColors.json();

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

/**
     * Gets all users journals
     * @param userEmail (string), setJournals (function)
     * @return none
     */
export async function getJournalData(userEmail, setJournals) {
    try {
        const res = await fetch(`http://localhost:8000/journals/${userEmail}`)
        const journalData = await res.json();

        //set user journals
        setJournals(journalData)
    } catch(err) {
        console.log(err)
    }
}


/**
     * Gets all users sounds and current background sound
     * @param email (string), setSounds (function), setDefaultBgSound (function), setBgSound (function)
     * @return none
     */
export async function getCurrentSound(email, setSounds, setDefaultBgSound, setBgSound) {
    try {
        const res = await fetch(`http://localhost:8000/user/${email}`)
        const data = await res.json();
        //setBgSound(data.currSound)

        const resSounds = await fetch(`http://localhost:8000/sounds/${email}`)
        const dataSounds = await resSounds.json();

        setSounds(dataSounds)

        //Check if the user just wants to play the defualt breathing bg sounds
        if (data.currSound == 'Default breathing'){
            setDefaultBgSound(true)
        }

        //Loop through users purchased sounds to find the sound that the user wants to be their background
        else {
            dataSounds.map((s) => {
                if (s.name == data.currSound) {
                    setBgSound(s.src)

                }
            })
        }

    } catch(err) {
        console.log(err)
    }
}


/**
     * Returns count of users leafs
     * @param email (string), setCurrLeafs (function)
     * @return none
     */
export async function getLeafCount(email, setCurrLeafs) {
    try {
        const res = await fetch(`http://localhost:8000/user/${email}`)
        const data = await res.json();
        setCurrLeafs(data.coins)
    } catch(err) {
        console.log(err)
    }
}
