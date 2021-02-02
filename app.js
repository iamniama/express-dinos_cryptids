const fs = require('fs')
const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
const methodOverride = require('method-override');
const { getCiphers } = require('crypto')
const { render } = require('ejs')
const port = 9999

//middleware
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//handlers for the data files
const getFile = (fileName) =>{
    return JSON.parse(fs.readFileSync(fileName))
}

const writeFile = (fileName, fileData)=> {
    fs.writeFileSync(fileName, JSON.stringify(fileData))
}

app.get("/dinosaurs", (req, res)=>{
    let dinos = getFile("./dinosaurs.json")
    res.render('dinos/index', {title: "dinosaurs", critters: dinos })
})

app.get("/dinosaurs/new", (req, res)=>{
    res.render("dinos/new", {title: "dinosaurs"})
})

app.get("/dinosaurs/:idx", (req, res)=> {
    let dinos = getFile("./dinosaurs.json")
    res.render("dinos/index", {title: "dinosaurs", critters: [dinos[req.params.idx]] })
})

app.get("/dinosaurs/edit/:idx", (req, res)=>{
    let dinos = getFile("./dinosaurs.json")
    res.render("dinosaurs/edit", {title: "dinosaurs", dino: dinos[req.param.idx], dinoId: req.params.idx}
})

app.post("/dinosaurs", (req, res)=>{
    let dinos = getFile("./dinosaurs.json")
    dinos.push(req.body)
    writeFile("./dinosaurs.json", dinos)
    res.redirect("/dinosaurs")
})

app.delete("/dinosaurs/:idx", (req, res)=>{
    let dinos = getFile("./dinosaurs.json")
    dinos.splice(req.params.idx, 1)
    writeFile("./dinosaurs.json", dinos)
    res.redirect("/dinosaurs")
})


app.listen(port)
