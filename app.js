const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { MongoClient } = require('mongodb');
const path = require('path');
//const uri = "mongodb+srv://root:12password@mflix.pvgzl.mongodb.net/pangolin?retryWrites=true&w=majority"
const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//const stuffRoutes = require("./route/stuff");
const userRoutes = require('./route/user');
const pangolinRoutes = require('./route/pangolin');

async function run() {
  try {
    await client.connect();
    /* const database = client.db('local');
    const movies = database.collection('startup_log');
    // Query for a movie that has the title 'Back to the Future' to test it
    const query = { hostname: 'DESKTOP-0MB6IBH' };
    const movie = await movies.findOne(query); */
    console.log("db work!!!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/',pangolinRoutes)
app.use('/api/auth', userRoutes);

module.exports = app;