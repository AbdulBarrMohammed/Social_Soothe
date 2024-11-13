const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require("passport");

async function displayFlowers(req, res) {

    try {
        const { email } = req.params
        const flowers = await db.getAllFlowers(email);
        res.json(flowers); // Sending the users to the frontend
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching flowers' });
    }


}

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

    try {
        await db.insertNewFlower(email, color, questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            x,
            y,
            questionSeven, dateCreated, done);
        // Send a success response with any necessary data back to the client
        res.status(201).json({ message: 'flower created successfully'});
    } catch (error) {
        console.error("Error creating flower entry:", error);
        // Send an error response
        res.status(500).json({ message: 'Failed to create flower entry', error: error.message });
    }
}

async function getSelectedFlower(req, res) {
    try {
        const id  = req.params.id
        const flower = await db.getFlower(id);
        res.json(flower)
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching flowers' });
    }



}

async function deleteFlower(req, res) {
    try {
        const id  = req.params.id
        await db.deleteFlower(id);
        res.json("Succesfully deleted flower")
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error deleting flower' });
    }

}

async function editFlowerPost(req, res) {

    try {
        const {id, color, questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            questionSeven, done} = req.body
        await db.updateFlower(id, color, questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            questionSeven, done);
        res.json("successfully updated flower")

    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error updating flower' });
    }

}

async function editFlowerPostColor(req, res) {
    try {
        const {currId, color, done} = req.body
        await db.updateFlowerColor(currId, color, done);
        res.json("successfully updated flower done and color")
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error updating flower done and color' });
    }
}


module.exports = {
    displayFlowers,
    createFlowerPost,
    getSelectedFlower,
    deleteFlower,
    editFlowerPost,
    editFlowerPostColor


}
