const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost/NotasDb', {
    // useCreateIndex: true,
    // useNewUrlPerser: true, 
    //useFindAndModify: false
})
    .then(db => console.log('Db Conectada.'.yellow.bold))
    .catch(err => console.error(err));
