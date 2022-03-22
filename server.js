const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://nadiop97:Ynover_97@cluster0.wq4ds.mongodb.net/medical-ws?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database 💾✔️");    
  }).catch(err => {
    console.log('Could not connect to the database. Error... 💾❌', err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Server is running 🚀"});
});

let PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🚀 `);
});


