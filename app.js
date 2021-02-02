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

app.get("/", (req,res)=>{
    res.render("base/index", {title: "critters"})
})

app.get("/critters", (req,res)=>{
    res.redirect("/")
})

app.get("/critters/new", (req, res)=>{
    res.redirect("/")
})

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
    res.render("dinos/edit", {title: "dinosaurs", dino: dinos[req.params.idx], dinoId: req.params.idx})
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

app.put("/dinosaurs/:idx", (req, res)=>{
    let dinos = getFile("./dinosaurs.json")
    dinos[req.params.idx] = {name: req.body.name, type: req.body.type}
    writeFile("./dinosaurs.json", dinos)
    res.redirect("/dinosaurs")
})


////////////////////////////////////////////////////////

app.get("/cryptids", (req, res)=>{
    let cryptids = getFile("./cryptids.json")
    res.render('cryptids/index', {title: "cryptids", critters: cryptids })
})

app.get("/cryptids/new", (req, res)=>{
    res.render("cryptids/new", {title: "cryptids"})
})

app.get("/dinosaurs/:idx", (req, res)=> {
    let cryptids = getFile("./cryptids.json")
    res.render("cryptids/index", {title: "cryptids", critters: [cryptids[req.params.idx]] })
})

app.post("/cryptids", (req, res)=>{
    let cryptids = getFile("./cryptids.json")
    cryptids.push(req.body)
    writeFile("./cryptids.json", cryptids)
    res.redirect("/cryptids")
})

app.get("/cryptids/edit/:idx", (req, res)=>{
    let cryptids = getFile("./cryptids.json")
    res.render("cryptids/edit", {title: "cryptids", critter: cryptids[req.params.idx], critterId: req.params.idx})
})



app.delete("/cryptids/:idx", (req, res)=>{
    let cryptids = getFile("./cryptids.json")
    cryptids.splice(req.params.idx, 1)
    writeFile("./cryptids.json", cryptids)
    res.redirect("/cryptids")
})

app.put("/cryptids/:idx", (req, res)=>{
    let cryptids = getFile("./cryptids.json")
    cryptids[req.params.idx] = {name: req.body.name, img_url: req.body.img_url}
    writeFile("./cryptids.json", cryptids)
    res.redirect("/cryptids")
})

app.listen(port)
