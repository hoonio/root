var express = require('express')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https')
var app = express()
app.set('port', process.env.PORT || 8000)
app.use(express.static('public'))

app.use(function(req, res, next) {
  console.log(req.method, 'at', req.path)
  next()
})

app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

app.get('/', function(req, res) {
  res.send('Hello from express')
})

app.get('/react', function(req, res){
  var page = fs.readFileSync('public/index.html').toString()
  res.send(page)
})

// to prevent embedded maps in news articles from disappearing
app.get('/helpage(.html)?', function(req, res) {
  var data = fs.readFileSync('public/helpage.html').toString()
  res.send(data)
});

app.get('/error/:reqpage', function(req, res){
  res.status(404).send('No page named' + req.params.reqpage + ' found')
})

app.get('/*', function(req, res) {
  res.redirect('/')
});

var server = app.listen(app.get('port'), function() {
  console.log('Express server running at http://localhost:'+ server.address().port)
})
