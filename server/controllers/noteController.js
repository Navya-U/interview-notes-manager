const Note = require('../models/Note');

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.userId }).sort({
    updatedAt: -1,
  });
  res.json(notes);
};

const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  if (note.user.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  res.json(note);
};

const createNote = async (req, res) => {
  const { title, content, tags, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const newNote = await Note.create({
      user: req.user.userId,
      title,
      content,
      tags,
      category,
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating note' });
  }
};

const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ error: 'Note not found' });

  if (note.user.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedNote);
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  if (note.user.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not Authorized' });
  }

  await note.deleteOne();

  res.json({ message: 'Note deleted' });
};

const toggleStarred = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ error: 'Note not found' });

  if (note.user.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  note.starred = !note.starred;
  await note.save();

  res.json({ message: 'Starred status updated', note });
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleStarred,
};
