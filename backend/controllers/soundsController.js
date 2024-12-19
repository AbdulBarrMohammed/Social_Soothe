const db = require('../db/queries');


/**
     * Display all users sounds
     * @param request, response
     * @return none
     */
async function displaySounds(req, res) {
    try {
        const { email } = req.params
        const sounds = await db.getAllSounds(email);
        res.json(sounds);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sounds' });
    }


}

/**
     * Creates a new sound object and adds to user database
     * @param request, response
     * @return none
     */
async function createSoundPost(req, res) {
    const { email, name, src } = req.body
    try {
        await db.insertNewSound(email, name, src);
        res.status(201).json({ message: 'Sound created successfully', email, name, src });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create sound', error: error.message });
    }
}

/**
     * Gets a selected sound
     * @param request, response
     * @return none
     */
async function getSelectedSound(req, res) {
    try {
        const id  = req.params.id
        const sound = await db.getSound(id);
        res.json(sound)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sound' });
    }



}



module.exports = {
    displaySounds,
    createSoundPost,
    getSelectedSound,



}
