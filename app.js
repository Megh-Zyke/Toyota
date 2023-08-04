
const express  = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/ToyotaDB",{useNewUrlParser:true,useUnifiedTopology:true});

app.set('view engine', 'ejs');
const carSchema = new mongoose.Schema({ 
    name:String,
    type:String,
    exshowroom:Number,
    mileage:Number,
    transmission:String,
    engine:Number,
    descr : String,
    img : String
});

const Car = mongoose.model("Car",carSchema);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.render("home");
});
app.get("/result",function(req,res){
    Car.find({}).sort({exshowroom:1})
    .then((D)=>{
    res.render("index" , {Data:D});
    }).
    catch((err)=>{
        console.log(err);
    });
});

var fuel;
app.post("/form",function(req,res){
    var fuel = req.body.fueltype;
    var price = req.body.exshowroom;
    var mileage = req.body.mileage;
    var transmission = req.body.transmission;
    var engine = req.body.engine;

    // Create an empty filter object
  var filter = {};

  // Add filters for non-empty input fields
  if (fuel) {
    filter.type = fuel;
  }
  if (price) {
    filter.exshowroom = { $lt: price };
  }
  if (mileage) {
    filter.mileage = { $gt: mileage };
  }
  if (transmission){
        filter.transmission = transmission;
  }
  if (engine){
    filter.engine = {$lt: engine};
    }

    console.log(filter);
    Car.find(filter).sort({exshowroom:1})
    .then((D)=>{
    res.render("index" , {Data:D});
    }).
    catch((err)=>{
        console.log(err);

});
})



app.get("/form" , function(req,res){
    res.render("form");
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  



