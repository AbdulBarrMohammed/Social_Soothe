export const questions = [
    "Whats the worst that can happen?",
    "Who is gonna judge you?",
    "How bad will that really be?",
    "Whats the odds of that actually happening?",
    "How will you cope if does happen?",
    "How did the event go?"
]


/**
    * Adds questions answered from users to their flower database
    * @param email (string), questionOne,(string) questionTwo(string), questionThree(string), questionFour(string), questionFive(string), questionSix(string), questionSeven(string), setShowSubmit (function)
    * @return none
    */
export async function submitAnswers(email, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, setShowSubmit) {

    //Set random position on tree
    const x = Math.random() * 800;
    const y = Math.random() * 350;

    //Add flower to database
    const response = await fetch(`http://localhost:8000/flowers/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, x, y})

     })

     //Check if response is successful
     if (response.ok) {
        const data = await response.json();
        setShowSubmit(false)

        // Navigate back to tree of flowers page
        window.location.reload();
      } else {

        console.error("Failed to create flower");
      }
}


/**
    * Increments each question and sets their answers into each question state
    * @param index (int), input(string)  setQuestionSix (function), setShowQuestions(function), setShowSubmit(function), setIndex(function), setQues(function), setQuestionTwo(function), setQuestionThree(function), setQuestionFour(function),
    setQuestionFive(function), setInput(function)
    * @return none
    */
export function increment(index, input, setQuestionSix, setShowQuestions, setShowSubmit, setIndex, setQues, setQuestionTwo, setQuestionThree, setQuestionFour,
    setQuestionFive, setInput) {
    if (index == 4) {
        setQuestionSix(input)
        setShowQuestions(false)
        setShowSubmit(true)
        setIndex(1)
        setQues(questions[1])
    } else {
        if (index == 0) {
            setQuestionTwo(input)
        }
        else if (index == 1) {
            setQuestionThree(input)
        }
        else if (index == 2) {
            setQuestionFour(input)
        }
        else if (index == 3) {
            setQuestionFive(input)

        }
        setIndex(++index);
        setQues(questions[index])
    }
    setInput("")
}

/**
    * Sets color for tree flower if they have completed the event by checking the checkbox
    * @param done (boolean), currId (int), setOpenModal (function)
    * @return none
    */
export async function handleColorChange(done, currId, setOpenFlowerModal) {
        try {
            let color = done ?  "#F79BB4" : "#808080"; //F79BB4 808080 #59033
            const response = await fetch(`http://localhost:8000/flowers/flower/color/update/${currId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({currId, color ,done})})

        } catch(err) {
            console.log(err)
        }
        window.location.reload();
        setOpenFlowerModal(false)

}

/**
    * Deletes flower from tree
    * @param currId (int)
    * @return none
    */
export async function deleteFlower(currId) {
    if (confirm("Are you sure you want to delete?")) {
        try {
            const res = await fetch(`http://localhost:8000/flowers/flower/delete/${currId}`)
            const data = await res.json();
        } catch(err) {
            console.log(err)
        }
    }
    window.location.reload();

}


/**
    * Add answered question seven to user flower database
    * @param currId (int), questionSeven (string), setQuestionSevenModal (function)
    * @return none
    */
export async function addQuestionSeven(currId, questionSeven, setQuestionSevenModal) {
    try {
        const id = currId
        const response = await fetch(`http://localhost:8000/flowers/flower/questionSeven/update/${currId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id, questionSeven})})
        setQuestionSevenModal(false)

    } catch(err) {
        console.log(err)
    }
}
