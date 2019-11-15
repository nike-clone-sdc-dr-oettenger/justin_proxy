const express = require('express');
const bodyParser = require('body-parser');
//const compression = require('compression');
const axios = require('axios');
const port = 3000;
const cors = require('cors');
const request = require('request');
const app = express();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* Random URL test
console.log(getRandomInt(3));
// expected output: 0, 1 or 2
*/



/* LoadBalancer */ 
//3 instances of Josh_Overview Load Balancer can serve up bundle.js from
//  1) http://ec2-54-153-99-135.us-west-1.compute.amazonaws.com/
//  2) http://ec2-13-56-178-145.us-west-1.compute.amazonaws.com/
//  3) http://ec2-13-57-16-171.us-west-1.compute.amazonaws.com/

// var urls = ['http://ec2-54-153-99-135.us-west-1.compute.amazonaws.com', 'http://ec2-13-56-178-145.us-west-1.compute.amazonaws.com/', 'http://ec2-13-57-16-171.us-west-1.compute.amazonaws.com/'];
var urls = ['http://ec2-52-38-28-66.us-west-2.compute.amazonaws.com:3000/bundle.js', 'http://ec2-35-165-229-57.us-west-2.compute.amazonaws.com:3000/bundle.js'];
app.listen(port, () => {
  console.log(`App is listening on LoadBalancer Port ${port}`);
});
//app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//getRandomInt(2) ---> ouput: 0, 1
var getRandomIndex = function() {
  return getRandomInt(2);
}
app.get('/', (req, res) =>{
  //body is bundle
  console.log('load balancer hit');
  request(urls[getRandomIndex()], function(err, response, body){
    // console.log('sexy body', JSON.parse(body))
    res.send(body)
    // res.sendFile(body); DOES NOT WORK
  })

  
})