require('dotenv').config()
const hbs =require('hbs');
const express = require("express");
const fetch =require("node-fetch");
const app = express();
hbs.localsAsTemplateData(app);
const PORT = process.env.PORT || 3010

app.set("view engine", "hbs")
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({extended :false}));

app.listen(PORT, ()=>{
    console.log("server at http://localhost:3010");
})

app.get("/", (req,res) =>{

    fetch(`http://newsapi.org/v2/everything?domains=wsj.com&apiKey=${process.env.APIKEY}`)
    .then(res => res.json())
    .then(data => {
        /* console.log(data); */
    res.render("home", {data : data})
    }) 
    .catch((err)=> console.log(err));
})

