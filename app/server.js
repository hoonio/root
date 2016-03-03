var express = require('express')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https')
  , path    = require('path')
  , compression = require('compression')

var app = express()
app.use(compression())
app.set('port', process.env.PORT || 8000)
var publicPath = (process.env.NODE_ENV === 'production') ? './public' : './dist/public';

app.use(express.static(publicPath))

app.use(function(req, res, next) {
  console.log(req.method, 'at', req.path)
  next()
})

app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

app.get('/express', function(req, res) {
  res.send('Hello from express')
})

// to prevent embedded maps in news articles from disappearing
app.get('/helpage(.html)?', function(req, res) {
  var data = fs.readFileSync(publicPath + '/helpage.html').toString()
  res.send(data)
});

app.get('/error/:reqpage', function(req, res){
  res.status(404).send('No page named' + req.params.reqpage + ' found')
})

app.get('/*', function(req, res){
  var page = fs.readFileSync(publicPath + '/index.html').toString()
  res.send(page)
})

var server = app.listen(app.get('port'), function() {
  console.log('Express server running at http://localhost:'+ server.address().port)
})

module.exports = app;
