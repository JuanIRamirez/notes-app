const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

//mongoose.connect('mongodb://localhost/NotasDb', {
mongoose.connect('mongodb://127.0.0.1/NotasDb', {
    // useCreateIndex: true,
    // useNewUrlPerser: true, 
    //useFindAndModify: false
})
    .then(db => console.log('Db Conectada.'.yellow.bold))
    .catch(err => console.log(err));
