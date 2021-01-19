const mongoose = require('mongoose');
const { dbConfig } = require('../config');

const uri = `mongodb+srv://${dbConfig.user}:${dbConfig.pass}@dosalamos.v5odo.mongodb.net/${dbConfig.name}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('Error db: ', e))