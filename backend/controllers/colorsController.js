const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require("passport");

async function displayColors(req, res) {
    try {
        const { email } = req.params
        const colors = await db.getAllColors(email);
        res.json(colors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sounds' });
    }

}

async function createColorPost(req, res) {
    const { email, name, dark, semiDark, medium, light, lightest } = req.body
    try {
        await db.insertNewColor(email, name, dark, semiDark, medium, light, lightest);
        // Send a success response with any necessary data back to the client
        res.status(201).json({ message: 'Color created successfully', email, name, dark, semiDark, medium, light, lightest });
    } catch (error) {
        console.error("Error creating sound:", error);
        // Send an error response
        res.status(500).json({ message: 'Failed to create journal entry', error: error.message });
    }
}

async function getSelectedColor(req, res) {
    try {
        const color = req.params.color;
        const email = req.params.email
        const currColor = await db.getColor(color, email);
        res.json(currColor)
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching users' });
    }

}

async function deleteColor(req, res) {
    try {
        const id  = req.params.id
        await db.deleteColor(id);
        res.json("Succesfully deleted sound")
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error deleting journal' });
    }

}




module.exports = {
    displayColors,
    createColorPost,
    getSelectedColor,
    deleteColor


}
