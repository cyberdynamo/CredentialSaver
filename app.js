var express =   require("express");
var app = express();
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var mongoose =  require("mongoose");
mongoose.connect("mongodb://localhost/mydb1");
var credentialSchema = new mongoose.Schema({
    emailid: String,
    password: String
});
var Credential = mongoose.model("Credential", credentialSchema);


app.get("/", function(req, res){
    res.render("index");
})

app.get("/yourdb", function(req, res){
    Credential.find({}, function(err, allCredentials){
        if(err){
            console.log("SOME PROBLEM OCCURED");
        }
        else{
            res.render("yourdb", {credentials: allCredentials});
        }
    })
})

app.post("/yourdb", function(req, res){
    console.log(req.body);
    var emailid = req.body.emailid;
    var password = req.body.password;
    var newCredential = {emailid: emailid, password: password};

    Credential.create(newCredential, function(err, newlyCreated){
        if(err){
            console.log("SOME PROBLEM OCCURED");
        }
        else{
            res.redirect("/yourdb");
        }
    })
})

app.listen(3000, function(){
    console.log("Server started listening...");
});