const db = require('../db/queries');


/**
     * Gets all users journals
     * @param request, response
     * @return none
     */
async function displayJournals(req, res) {
    try {
        const { email } = req.params
        const journals = await db.getAllJournals(email);
        res.json(journals); // Sending the journals to the frontend
    } catch (err) {
        res.status(500).json({ message: 'Error fetching journals' });
    }


}

/**
     * Creates a journal object and adds it to user database
     * @param request, response
     * @return none
     */
async function createJournalPost(req, res) {
    const {email, title, content, mood } = req.body
    const dateCreated = new Date()

    try {
        await db.insertNewJournal(email, title, content, mood, dateCreated);
        // Sends a success response
        res.status(201).json({ message: 'Journal created successfully', email, title, content, mood, dateCreated });
    } catch (error) {
        // Sends an error response
        res.status(500).json({ message: 'Failed to create journal entry', error: error.message });
    }
}

/**
     * Gets a journal object in user database
     * @param request, response
     * @return none
     */
async function getSelectedJournal(req, res) {
    try {
        const id  = req.params.id
        const journal = await db.getJournal(id);
        res.json(journal)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }



}

/**
     * Deletes a journal from user database
     * @param request, response
     * @return none
     */
async function deleteJournal(req, res) {
    try {
        const id  = req.params.id
        await db.deleteJournal(id);
        res.json("Succesfully deleted journal")
    } catch (err) {
        res.status(500).json({ message: 'Error deleting journal' });
    }

}

/**
     * Edits selected journal
     * @param request, response
     * @return none
     */
async function editJournalPost(req, res) {

    try {
        const {id, title, content} = req.body
        await db.updateJournal(id, title, content);
        res.json("Successfully updated journal")

    } catch (err) {
        res.status(500).json({ message: 'Error updating journal' });
    }

}


/**
     * Query searches for users journals
     * @param request, response
     * @return none
     */
async function searchGet(req, res) {
    try {
        const { query, email } = req.params
        const journal = await db.getSearchQuery(email, query);
        res.json(journal)
    } catch (err) {
        res.status(500).json({ message: 'Error searching Journal' });
    }
}



module.exports = {
    displayJournals,
    createJournalPost,
    getSelectedJournal,
    deleteJournal,
    editJournalPost,
    searchGet


}
