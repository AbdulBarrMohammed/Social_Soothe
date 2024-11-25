const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require("passport");

async function displaySounds(req, res) {
    try {
        const { email } = req.params
        const sounds = await db.getAllSounds(email);
        res.json(sounds); // Sending the users to the frontend
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching sounds' });
    }


}

async function createSoundPost(req, res) {
    const { email, name, src } = req.body
    try {
        await db.insertNewSound(email, name, src);
        // Send a success response with any necessary data back to the client
        res.status(201).json({ message: 'Sound created successfully', email, name, src });
    } catch (error) {
        console.error("Error creating sound:", error);
        // Send an error response
        res.status(500).json({ message: 'Failed to create journal entry', error: error.message });
    }
}

async function getSelectedSound(req, res) {
    try {
        const id  = req.params.id
        const sound = await db.getSound(id);
        res.json(sound)
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching users' });
    }



}

async function deleteSound(req, res) {
    try {
        const id  = req.params.id
        await db.deleteSound(id);
        res.json("Succesfully deleted sound")
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error deleting journal' });
    }

}

async function searchGetSound(req, res) {
    try {
        const { query, email } = req.params
        const sound = await db.getSearchQuerySound(email, query);
        res.json(sound)
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error searching flower' });
    }
}



module.exports = {
    displaySounds,
    createSoundPost,
    getSelectedSound,
    deleteSound,
    searchGetSound


}
