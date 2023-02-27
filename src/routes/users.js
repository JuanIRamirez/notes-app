const router = require('express').Router();
const User = require('../models/User');

router.get('/users/signin', (req, res) => {
    res.render("users/signin");
})

router.get('/users/signup', (req, res) => {
    res.render("users/signup");
})

router.post('/users/signup', async (req, res) => {
    const {name, email, password, passconf} = req.body;
    const errors = [];
    if (!name) {
        errors.push({text: 'Ingrese su Nombre !'})
    }
    if (!email) {
        errors.push({text: 'Ingrese su e-Mail !'})
    }
    if (!password) {
        errors.push({text: 'Ingrese Contraseña !'});
    } else {
        if ( password.length < 5) {
            errors.push({text: 'Contraseña muy corta !'});
        } else {
            if( password != passconf ) {
                errors.push({text: 'Contraseñas no coinciden !'});
            }
        }
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, passconf});
    } else {
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encyptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro exitoso !');
        res.redirect('/users/signin');
    }
})

module.exports = router;