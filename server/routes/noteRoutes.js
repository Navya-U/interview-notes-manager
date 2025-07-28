const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleStarred,
} = require('../controllers/noteController');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/star', toggleStarred);

module.exports = router;
