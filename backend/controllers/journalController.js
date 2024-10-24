const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require("passport");

async function displayJournals(req, res) {
    //const { email }  = req.user;

    //THIS IS A TEST VALUE
    //const email = 'user@example.com'

    console.log("displaying journals")

    try {
        const { email } = req.params
        const journals = await db.getAllJournals(email);
        res.json(journals); // Sending the users to the frontend
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching users' });
    }


}

async function createJournalPost(req, res) {
    const {email, title, content, mood } = req.body
    const dateCreated = new Date()

    try {
        await db.insertNewJournal(email, title, content, mood, dateCreated);
        // Send a success response with any necessary data back to the client
        res.status(201).json({ message: 'Journal created successfully', email, title, content, mood, dateCreated });
    } catch (error) {
        console.error("Error creating journal entry:", error);
        // Send an error response
        res.status(500).json({ message: 'Failed to create journal entry', error: error.message });
    }
}

async function getSelectedJournal(req, res) {
    console.log("running selectd")
    try {
        const id  = req.params.id
        console.log("printing id")
        const journal = await db.getJournal(id);
        res.json(journal)
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching users' });
    }



}

module.exports = {
    displayJournals,
    createJournalPost,
    getSelectedJournal


}
