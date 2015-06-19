var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require("./models"),
    methodOverride = require("method-override"),
    favicon = require('serve-favicon'),
    morgan = require("morgan"),
    request = require("request");

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', function(req,res){
  res.render('layout');
});

app.get('/places', function(req,res){
  db.Place.find({}, function(err,places){
          res.format({
        'text/html': function(){
          res.render("places/index", {places:places});
        },
        'application/json': function(){
          res.send({places:places});
        },
        'default': function(){
          res.status(406).send('Not Acceptable');
        }
      })
   //res.render("places/index", {places: places});
  });
});

app.post('/places', function(req,res){
  var place = new db.Place(req.body.place);
//to find longitude and latitude if they're missing
 if(place.long === null || place.lat === null){
  var add = new RegExp(place.address);
  var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + add;
  //request from google API for lat/long
  request(url, function(error, response, body){
    if(error){
      console.log(error);
      res.render('errors/500');
    }
    //get lat/long from JSON and save
    else if(!error && response.statusCode ===200){
      placeData = JSON.parse(body).results[0];
      var long = placeData.geometry.location.lng;
      var lat = placeData.geometry.location.lat;
      place.long = long;
      place.lat = lat;
      //save place with added lat/long
      place.save(function(err,place) {
       res.format({
        'text/html': function(){
          res.render("places");
        },
        'application/json': function(){
          res.send({place:place});
        },
        'default': function(){
          res.status(406).send('Not Acceptable');
        }
      })
     })
    }
   })
  }
 else {
  place.save(function(err,place) {
       res.format({
        'text/html': function(){
          res.render("places");
        },
        'application/json': function(){
          res.send({place:place});
        },
        'default': function(){
          res.status(406).send('Not Acceptable');
        }
      })
     })
    }
});

app.get('/places/new', function(req,res){
  res.render("places/new");
});

app.get('/places/:id/', function(req,res){
  db.Place.findById(req.params.id, function(err,place){
    res.render("places/show", {place:place});
  });
});

app.get('/places/:id/edit', function(req,res){
  db.Place.findById(req.params.id, function(err,place){
    res.render("places/edit", {place:place});
  });
});

app.put('/places/:id', function(req,res){
  db.Place.findByIdAndUpdate(req.params.id, req.body.place, function(err,place){
    res.redirect('/places');
  });
});

app.delete('/places/:id', function(req,res){
  db.Place.findByIdAndRemove(req.params.id, function(err,place){
    res.redirect('/places');
  });
});

app.get('*', function(req,res){
  res.render('errors/404');
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});