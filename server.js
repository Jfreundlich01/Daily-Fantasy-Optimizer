/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const path = require("path");
const PlayerRouter = require("./controllers/players.js")
const session = require("express-session")
const MongoStore = require("connect-mongo"); //what connects to the mongo database


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
//didn't include app at the top since it's only used here
const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
// middleware to setup session
//Middleware to setup session
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUninitialized: true,
    resave: false,
  })
);

////////////////////////////////////////////
// Routes (Root Route)
////////////////////////////////////////////
app.use("/players", PlayerRouter); //now has access to all routes in fruits.js and will put the /fruit in front of every route created within that router


// app.get("/", (req, res) => { //leave this one in server!!!
//   res.send(`your server is running... you better catch it.`);
// });
app.get("/", (req, res) => {
  res.send("Your server is running, better go catch it");
});


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(process.env.PORT || 3000, function() {
  console.log(`app listening on port ${PORT}`)
})







