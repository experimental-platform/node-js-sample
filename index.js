var express = require('express')
var exec = require('child_process').exec
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  exec('gm -version', function(error, stdout, stderr) {
    if (error) {
      response.send('error: ' + JSON.stringify(error))
      return
    }
    if (stderr) {
      response.send('error: ' + stderr)
      return
    }
    response.send("<code><pre>" + stdout + "</pre></code>")
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
