const  express = require("express");
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
let $ = require("jquery");
let url = require('url');
const https= require('https');
const app = express();
var key = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA3oVSvohF8YgqWhqU1FSWNyJ4Id0fjh3FxwBpLUBrBv0ibp82
LnIzKfxNNHEFW6dtMer0R5BgAgmDlca1yVskbcqEvI1Rd0hosQ2GiQRh/0wAXScr
OSagbhkItik4s3a+fZsvcg2b08pATx1zJe+6WttGlj4lnYWaTSWOTghrBgozJ+14
JUy1t3MCA4WNqg+RZPL3NDTKTpKfMlZHIcBysgiiNi7yzL8LNRRdFHZlHFnmWU7/
WLuzmvs//mOouVOoDjUjwEzX2n3UxDxq0QtQzWGpStQK+BFXcbmpX7/Ss4gVrrOu
gPErtV+Ui8Hvi/Rz0sYmZGKvwAFeEqHvtEduswIDAQABAoIBABK/xRMMxGfvgzII
X1XssqN+ogSobwo4c/uqizIm5V23YnlTrOsI8EqvWYn7o+nvF4JHO8Hz5kMFrjKm
hZaruUwO7lQ8zApy7W9NpnJRDjjGnJk8vaWZHZdpQJSosIBelvpaYwsHHoQf3H9O
Ce++XUNeinoKTn0RTskFSxJEH1Boz1lC2MsuBvS2HACbd5YhRP+0ZezqXA8D3zcR
MgtoEPu2diE84u8sgDfxkfRnPkxBxCqm6HhsQDmf/Z5N5iNQdr5nngmNJgpZE3pq
Li68V1G4EZuI16VOdy1E1Bdl9aXd9FvBRd7uvCgVp01JOdIka+8g1HfknNR7yYOe
whsUMCECgYEA+MPe6sD6DG0KwJUwmb0DwsKb4voC6l2+LeyTE+J/v0/t5nmrHlQg
AvkCCqDNlxZl4jVS73qS60tZmU9L7iHkpOnZFFdyiGjZYk4ZnBbeh9yn1e7l2pP1
K69sgqYQP18zQ4X+MJ865T4u+eS8qAMr+khmaVx/hR192MVnvdDuGmkCgYEA5P4O
RYhaWcucDZE4G6D53CBIKxF6PnORfOlk8fG70JmrYkaHKO+zLjqwyQq8zL+TYdxy
mU9WRyhmn5+hfYaH28nZHngA/lZUt0iIliAkh8Ff02CjZudNwPU0VPtsBt3ag0SK
w+AzTdheh2pzMa6CSDv9eU/JukzP1FOcxNtchLsCgYEA0o2Gqg+4FLhed25O+nD/
M+Nf6hdOTGwXwesQ+a2mDplqdL7aVQtDJQD592DvYkg05+fWUJfgroLSTW7Oh7ns
OqEreYoiiM6l4AzWpES/CSN8cxiHOCAvTVBneZVw/xJm42oQIbtEMDAXtq8h9tro
aCjLdbYywMqbb9R14DVssrECgYEAyc/ViBY5enXlXFelmUPvsL6Km9pVYAC+MdYH
7uraWWd1EbGSoNNPmOiEsUnTRqd4HoEIRnETWrcSao9m5ZfQ2DU2MpIUXhJ7quQz
7Ar75uDXsRS0LZaggfQYYOUMOakAUTvxB9vpmyubc8CvMRPZIgwsweM9qADWEQx3
V070ZM0CgYEAqWz/4WXBELTUOOuRNWnOnqnh5CeeVtP4tzIRVFfVs/6NHRP+eqIG
faNSyx7xffSEXARqokk5DU8YNWw6RyJG4nHOS7emwdh0mxNrBbAws1W2DyJOii4C
iHsTyHqpIpNtb11svNh3vEjnRh5xOBJ83ZplLlPFlrcAh35JafisCpY=
-----END RSA PRIVATE KEY-----
` ;
var cert = `-----BEGIN CERTIFICATE-----
MIIGcjCCBFqgAwIBAgIQUsVLDl8bvBfSyaoCYfnEwzANBgkqhkiG9w0BAQwFADBL
MQswCQYDVQQGEwJBVDEQMA4GA1UEChMHWmVyb1NTTDEqMCgGA1UEAxMhWmVyb1NT
TCBSU0EgRG9tYWluIFNlY3VyZSBTaXRlIENBMB4XDTIxMTAxMTAwMDAwMFoXDTIy
MDEwOTIzNTk1OVowFTETMBEGA1UEAxMKZmludC5tb25leTCCASIwDQYJKoZIhvcN
AQEBBQADggEPADCCAQoCggEBAN6FUr6IRfGIKloalNRUljcieCHdH44dxccAaS1A
awb9Im6fNi5yMyn8TTRxBVunbTHq9EeQYAIJg5XGtclbJG3KhLyNUXdIaLENhokE
Yf9MAF0nKzkmoG4ZCLYpOLN2vn2bL3INm9PKQE8dcyXvulrbRpY+JZ2Fmk0ljk4I
awYKMyfteCVMtbdzAgOFjaoPkWTy9zQ0yk6SnzJWRyHAcrIIojYu8sy/CzUUXRR2
ZRxZ5llO/1i7s5r7P/5jqLlTqA41I8BM19p91MQ8atELUM1hqUrUCvgRV3G5qV+/
0rOIFa6zroDxK7VflIvB74v0c9LGJmRir8ABXhKh77RHbrMCAwEAAaOCAoYwggKC
MB8GA1UdIwQYMBaAFMjZeGii2Rlo1T1y3l8KPty1hoamMB0GA1UdDgQWBBRnwcoP
puZtT4uKUwlGb6Vcko9KCTAOBgNVHQ8BAf8EBAMCBaAwDAYDVR0TAQH/BAIwADAd
BgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwSQYDVR0gBEIwQDA0BgsrBgEE
AbIxAQICTjAlMCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29tL0NQUzAI
BgZngQwBAgEwgYgGCCsGAQUFBwEBBHwwejBLBggrBgEFBQcwAoY/aHR0cDovL3pl
cm9zc2wuY3J0LnNlY3RpZ28uY29tL1plcm9TU0xSU0FEb21haW5TZWN1cmVTaXRl
Q0EuY3J0MCsGCCsGAQUFBzABhh9odHRwOi8vemVyb3NzbC5vY3NwLnNlY3RpZ28u
Y29tMIIBBAYKKwYBBAHWeQIEAgSB9QSB8gDwAHcARqVV63X6kSAwtaKJafTzfREs
QXS+/Um4havy/HD+bUcAAAF8cHpquAAABAMASDBGAiEAvgKIQVRVwLBlJxBrtCUt
L83dYTdpFA0gIVsaB7Cu7ZcCIQCs6iPrxtQeq+PRuVCTCl90lr8+AYt10tLCfkxS
+FqmaAB1AEHIyrHfIkZKEMahOglCh15OMYsbA+vrS8do8JBilgb2AAABfHB6anUA
AAQDAEYwRAIgGArObSEtzKKssqNF7HQb0Q7SsOuFDtvIErlTc3gCTQQCIGsVwus8
wHsIODt3nt3B1/ypTD/p9mIpPBL4xPNx6vjiMCUGA1UdEQQeMByCCmZpbnQubW9u
ZXmCDnd3dy5maW50Lm1vbmV5MA0GCSqGSIb3DQEBDAUAA4ICAQBbf6VsaRN80bcB
7iDEhdGeW2kSN1KNPgsUM7LCHovimhjkKQAHlrAh1euYYyxw9XbOqg6HVjFKrsb6
XTvxF0PxmQhkS0CvFYO+/VzvBSmFtZfhot/2q9DKzulhDRpLJUOLbG0sXXAqCBXa
Zkh1lc+drq/lt5GXa15IEWM3EEIX1NSKXCJkXvid1wq8Tfs8ouwXm9a8irMP4gor
fDXBju/OwTxkSmvsCaq1dTDSHEKbTEl+eVQuwLeCzSrePytgJ+U2DBU5tpI79npR
/mlNnmLkLWnCxIDdaNOHQ/erxfkKjkZDeUQo0znHgUKOZATAgW6/lhReC9sylO6d
rY2wl6M9t66K6JJ2qYBSvAKr0g7WqjoXDK+6WibzH3pJqbQ6X6vGeZVv4FA9jByT
Ajp+4l5HZLaVMXHlX1q57IADFf87xudQ8kMcOu3UEFLZujmMSGKEIakdnTWCaOWb
C4IdMzqNuT/FsFqu6Ktk+P+GyPZ6rHvoKEVx/5g4c3Fm+EIoTHSxVM247TW1XdrA
6sEDkJmzNZJ1AhTvFkTyCfIjl9RRjgjMuPsPRlg/GW2yOkEGWBs/gDlFSgrueWfj
C+KA9jHSUEz5AzeccSvtH4Es6uAVOsLQ0u6j7OoN7x9Prm+ZLleXJo7ugg4gqsOE
TPqI9Lu3uNWxAxU9jg5bkDmQLaQ8VA==
-----END CERTIFICATE-----
` ; 

var options = {
  key : key,
  cert : cert
}; 

var server = https.createServer(options,app);

//create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({extended: false});

let wnumberafterin;
let referallink;

// const functions = require("firebase-functions");


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("home");
});
app.get("/home", (req, res) => {
  referallink=req.query.referrer;
  res.render("home", {foo: "FOO"});
});

mongoose.connect(

    "mongodb+srv://fintusers:Vedant123@cluster0.cfxbz.mongodb.net/event_db1?retryWrites=true&w=majority",
    {
      dbName: "event_db1",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => (err ? console.log(err) : console.log("Connected to database")),
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

app.post("/home", urlencodedParser, function (req, res){
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
      
      res.redirect("test");
      
      
    }else {
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

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://fintusers:Vedant123@cluster0.cfxbz.mongodb.net/event_db1?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("event_db1");
  console.log(dbo); 
  dbo.collection("users").find({}).toArray(function(err, result) {
  console.log(result) ; 
  if (err) throw err;
  console.log(result);
  });
});

app.get("/test", (req, res) => {
  User.findOne({ wnumber: wnumberafterin}, async function (err, user) {  
     if(user){
      res.render("test", {referalID: user._id} );
     }
  
});
});

var port  = process.env.PORT || 80;
server.listen(port, () => console.log("Example app listening on port 4000!"));
// app.listen(port, () => console.log("Example app listening on port 4000!"));
// app.listen(4000, () => console.log("Example app listening on port 4000!"));
// exports.app = functions.https.onRequest(app);
