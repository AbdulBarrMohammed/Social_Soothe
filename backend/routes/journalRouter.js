const {Router} = require("express");
const journalController = require("../controllers/journalController");

const router = Router();

router.get("/journals/:email", journalController.displayJournals);
router.post("/journals/create", journalController.createJournalPost)
router.get("/journals/journal/:id", journalController.getSelectedJournal)
router.get("/journals/journal/delete/:id", journalController.deleteJournal)
router.post("/journals/journal/update/:id", journalController.editJournalPost);
router.get("/search/:query/:email", journalController.searchGet);

module.exports = router;
