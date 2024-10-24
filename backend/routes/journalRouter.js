const {Router} = require("express");
const journalController = require("../controllers/journalController");

const router = Router();

router.get("/journals/:email", journalController.displayJournals);
router.post("/journals/create", journalController.createJournalPost)
router.get("/journals/journal/:id", journalController.getSelectedJournal)

module.exports = router;
