export const questions = [
    "Whats the worst that can happen?",
    "Who is gonna judge you?",
    "How bad will that really be?",
    "Whats the odds of that actually happening?",
    "How will you cope if does happen?",
    "How did the event go?"
]



export async function submitAnswers(email, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, setShowSubmit) {
    //add flower to database
    const x = Math.random() * 800;
    const y = Math.random() * 200;
    const response = await fetch(`http://localhost:8000/flowers/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, x, y})

     })
     if (response.ok) { // if response is successful
        const data = await response.json();
        console.log('Flower created successfully frontend:', data);
        setShowSubmit(false)
        // Navigate back to tree of flowers page
        window.location.reload();
      } else {
        // Handle error
        console.error("Failed to create flower");
      }
}


//increment each question
export function increment(index, input, setQuestionSix, setShowQuestions, setShowSubmit, setIndex, setQues, setQuestionOne, setQuestionTwo, setQuestionThree, setQuestionFour,
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


export async function handleColorChange(done, currId, setOpenModal) {
        try {
            let color = done ?  "#059033" : "#808080";
            const response = await fetch(`http://localhost:8000/flowers/flower/color/update/${currId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({currId, color ,done})})

        } catch(err) {
            console.log(err)
        }
        window.location.reload();
        setOpenModal(false)

}


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
