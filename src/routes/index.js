const router = require('express').Router();

router.get('/', (req, res) => {
    res.render("Index");    //   /views/Index.hbs
})

router.get('/about', (req, res) => {
    res.render('about');    //   /views/about.hbs
})

module.exports = router;