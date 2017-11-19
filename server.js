var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var Trello = require("node-trello");
var t = new Trello("674dce23795a54b9be3a090108a9ea45", "6ca9f47861320267f23f1406b36726fd4d6f76df584b946a5fa33a0ad1bbea89");


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
    t.post("/1/cards", { idList: "59da6052f1efec82449f108a", name:req.body.name + " " +  req.body.email, desc: req.body.message}, function(err, data) {
        if (err) throw err;
        console.log(data);
    });

    res.render('contact');
});

var port= (process.env.PORT || 8080);
app.listen(port, function () {
  console.log("Server listening on port 8080");
});
