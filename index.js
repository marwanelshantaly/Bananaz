var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var cors = require('cors')
var axios = require('axios')
var config = require('./config')
const Weight = require("./weight.js")
var app = express()
app.use(bodyParser.json())
app.use(cors())
mongoose.connect(config.db)
.then(() => console.log("Connected"))
.catch(err => console.log(err))
app.post('/calories', async (req, res) => {
    var calories = await axios.get('http://www.fruityvice.com/api/fruit/'+req.body.fruit)
    res.send({calories:calories.data.nutritions.calories}) 
})
app.post("/", async (req, res) => {
    var weight = new Weight({
        value:req.body.value,
        date:req.body.date
    })
    await weight.save()
    res.send(weight)
});
app.get("/", async (req, res) => {
    var weights = await Weight.find()
    res.send(weights)
})

app.put("/", async (req, res) => {
    var weight = await Weight.findByIdAndUpdate({id:req.body.id}, {value:req.body.value, date:req.body.date})
    res.send(weight)
})

app.delete("/", async (req, res) => {
    var weight  = await Weight.findByIdAndDelete(req.body.id)
    res.send(weight)
})
app.listen(config.port)