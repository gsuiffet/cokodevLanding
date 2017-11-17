var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var Trello = require("node-trello");
var t = new Trello("", "");

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/contact', function (req, res) {
    //var body = JSON.parse(body);
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.message);
// URL arguments are passed in as an object.
    //t.post("/1/members/me", { cards: "open" }, function(err, data) {
    t.post("/1/cards", { idList: "", name:req.body.name + " " +  req.body.email, desc: req.body.message}, function(err, data) {
        if (err) throw err;
        console.log(data);
    });

    res.render('contact');
});

app.listen(80, function () {
    console.log("Server listening on port 8080");
});
