const router = require('express').Router();
const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
})

router.get('/notes', async (req, res) => {
    const notes = await Note.find().lean().sort({title: 'asc'});
    res.render('notes/all-notes', {notes});
})

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {note});
})

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate( req.params.id, {title, description});
    req.flash('success_msg', 'Nota modificada !');
    res.redirect('/notes');
})

router.delete('/notes/delete/:id',  async ( req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota borrada !');
    res.redirect('/notes');
})

router.post('/notes/new-note', async (req, res) => {
    const {title, description} = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Ingrese el Título !'});
    }
    if (!description) {
        errors.push({text: 'Ingrese la Descripción !'});
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        //console.log(newNote);
        await newNote.save();
        req.flash('success_msg', 'Nota agregada !');
        res.redirect('/notes');
        //console.log(`Descripción: ${description}`)
        //res.send('OK');
    }
})

module.exports = router;