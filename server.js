const express = require('express');
const connectDb = require("./config/db");


const app = express();
connectDb();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(process.env.PORT || 5000, () => console.log('Up and running 🚀'));
