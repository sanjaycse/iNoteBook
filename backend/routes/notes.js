const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE:1 Get all the Notes
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.send(notes);
    } catch (error) {
        console.error(error.message)
    }
});

//ROUTE:2 Add new Note using POST
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid Title!').isLength({ min: 3 }),
    body('description', 'Description will be atleast 5 char!').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user : req.user.id
        })
        const savedNote = await note.save();
        
        res.send(savedNote);
    } catch (error) {
        console.error(error.message)
    }
});

//ROUTE:3 Update the Notes
router.put('/updatenote/:id',fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        // Create newNote object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send('Not Found')}

        if(note.user.toString() !== req.user.id){
            return req.status(401).send('Not Allowed')
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

        res.json({note});

    } catch (error) {
        console.error(error.message)
    }
});

//ROUTE:4 Delete the Notes
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        
        if(!note){return res.status(404).send('Not Found')}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed')
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been Deleted",note: note});

    } catch (error) {
        console.error(error.message)
    }
});

module.exports = router