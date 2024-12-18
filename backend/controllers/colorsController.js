const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require("passport");



/**
 * Gets all user authenticated users colors earned
 * @param request, response
 * @return none
 */
async function displayColors(req, res) {
    try {
        const { email } = req.params
        const colors = await db.getAllColors(email);
        res.json(colors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sounds' });
    }

}


/**
 * Creates new color object
 * @param request, response
 * @return none
 */
async function createColorPost(req, res) {
    const { email, name, dark, semiDark, medium, light, lightest } = req.body
    try {
        await db.insertNewColor(email, name, dark, semiDark, medium, light, lightest);

        // Send a success response with any necessary data back to the client
        res.status(201).json({ message: 'Color created successfully', email, name, dark, semiDark, medium, light, lightest });
    } catch (error) {
        // Send an error response
        res.status(500).json({ message: 'Failed to create color', error: error.message });
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
    deleteColor


}
