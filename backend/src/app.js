const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.send("SKD SM will be here soon");
});

app.listen(3042, function(){
  console.log('SKD SM stub is listening on port 3042!');
});
