let express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var $ = require("jquery");
var url = require('url');
let app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var wnumberafterin;
var referallink

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("home");
});
app.get("/home", (req, res) => {
  referallink=req.query.referrer;
  res.render("home", { foo: "FOO" });
});

mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "event_db1",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("Connected to database"))
);

const userSchema = new mongoose.Schema({
  goal: {
    type: String,
  },
  budget: String,
  savings: String,
  name: {
    type: String,
  },
  wnumber: {
    type: String,
  },
  referredcount: Number,
});

const User = mongoose.model("User", userSchema);

app.post("/home", urlencodedParser, function (req, res) {

  const newUser = new User({
    goal: req.body.goal,
    budget: req.body.budget,
    savings: req.body.savings,
    name: req.body.name,
    wnumber: req.body.wnumber,
    referredcount: 0,
  });

  User.findOne({ wnumber: req.body.wnumber }, async function (err, user) {
    if (user) {
      res.write("<h1> User already registerd with this number </h1>");
    } else {
      
      newUser.save(async function (err) {
        if (!err) {
          console.log("no error");
          wnumberafterin=req.body.wnumber;
          console.log(referallink);
         await User.findOneAndUpdate({ _id: referallink}, {
            $inc:{
              referredcount:1
            }
          });
          res.redirect("test");
          
        } else {
          console.log("error");
          res.redirect("home");
        }
      });
    }
  });
 
});

app.get("/test", (req, res) => {
  User.findOne({ wnumber: wnumberafterin}, async function (err, user) {
    
     if(user){
      res.render("test", {referalID: user._id} );
     }
  
});
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
