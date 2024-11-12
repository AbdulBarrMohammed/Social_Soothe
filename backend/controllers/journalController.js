const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require("passport");

async function displayJournals(req, res) {
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

async function deleteJournal(req, res) {
    try {
        const id  = req.params.id
        await db.deleteJournal(id);
        res.json("Succesfully deleted journal")
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error deleting journal' });
    }

}

async function editJournalPost(req, res) {

    try {
        const {id, title, content} = req.body
        await db.updateJournal(id, title, content);
        res.json("successfully updated journal")

    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error updating journal' });
    }

}


module.exports = {
    displayJournals,
    createJournalPost,
    getSelectedJournal,
    deleteJournal,
    editJournalPost


}
