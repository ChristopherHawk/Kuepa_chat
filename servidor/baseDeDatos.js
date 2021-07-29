const mongoose = require('mongoose');
require('dotenv').config()


const {CHATDB_URI} = process.env


mongoose.connect(CHATDB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
})

.then(db => console.log('Conexión con base de datos exitosa.'))
.catch(err => console.log(err));