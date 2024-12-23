const db = require('../db/queries');


/**
     * Gets all users flowers in their flower database
     * @param request, response
     * @return none
     */
async function displayFlowers(req, res) {

    try {
        const { email } = req.params
        const flowers = await db.getAllFlowers(email);
        res.json(flowers); // Sending the users to the frontend
    } catch (err) {
        res.status(500).json({ message: 'Error fetching flowers' });
    }

}

/**
     * Creates flower object and adds it to users database
     * @param request, response
     * @return none
     */
async function createFlowerPost(req, res) {
    const {email,
        questionOne,
        questionTwo,
        questionThree,
        questionFour,
        questionFive,
        questionSix,
        questionSeven,
        x,
        y } = req.body
    const color = 'gray'
    const dateCreated = new Date()
    const done = false
    const isChecked = false

    try {
        await db.insertNewFlower(email, color, questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            x,
            y,
            questionSeven, dateCreated, done, isChecked);
        // Sends a success response
        res.status(201).json({ message: 'Flower created successfully'});
    } catch (error) {
        // Sends an error response
        res.status(500).json({ message: 'Failed to create flower entry', error: error.message });
    }
}

/**
     * Gets a flower from user database
     * @param request, response
     * @return none
     */
async function getSelectedFlower(req, res) {
    try {
        const id  = req.params.id
        const flower = await db.getFlower(id);
        res.json(flower)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching flower' });
    }



}

/**
     * Removes a flower from users flowers in their database
     * @param request, response
     * @return none
     */
async function deleteFlower(req, res) {
    try {
        const id  = req.params.id
        await db.deleteFlower(id);
        res.json("Succesfully deleted flower")
    } catch (err) {
        res.status(500).json({ message: 'Error deleting flower' });
    }

}


/**
     * Edits a selected flower in user database
     * @param request, response
     * @return none
     */
async function editFlowerPost(req, res) {

    try {
        const {id, color, questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            questionSeven, done, isChecked} = req.body
        await db.updateFlower(id, color, questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            questionSeven, done, isChecked);
        res.json("successfully updated flower")

    } catch (err) {
        res.status(500).json({ message: 'Error updating flower' });
    }

}

/**
     * Edits flower's color
     * @param request, response
     * @return none
     */
async function editFlowerPostColor(req, res) {
    try {
        const {currId, color, done} = req.body
        await db.updateFlowerColor(currId, color, done);
        res.json("Successfully updated flower done and color")
    } catch (err) {
        res.status(500).json({ message: 'Error updating flower done and color' });
    }
}

/**
     * Edits flower's checked attribute
     * @param request, response
     * @return none
     */
async function editFlowerPostChecked(req, res) {
    try {
        const {currId, checked} = req.body
        await db.updateFlowerChecked(currId, checked);
        res.json("Successfully updated flower check")
    } catch (err) {
        res.status(500).json({ message: 'Error updating flower check' });
    }

}

/**
     * Edits question seven of flower object
     * @param request, response
     * @return none
     */
async function editFlowerQuestionSeven(req, res) {
    try {
        const {id, questionSeven} = req.body
        await db.updateFlowerQuestionSeven(id, questionSeven);
        res.json("Successfully updated flower question seven")
    } catch (err) {
        res.status(500).json({ message: 'Error updating flower check' });
    }
}


module.exports = {
    displayFlowers,
    createFlowerPost,
    getSelectedFlower,
    deleteFlower,
    editFlowerPost,
    editFlowerPostColor,
    editFlowerPostChecked,
    editFlowerQuestionSeven


}
