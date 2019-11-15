const express = require('express');
const app = express();
const port = 4069;
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
//app.use(express.static('../public/dist'));
app.use(bodyParser());

app.use(cors());

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var getRandomIndex = function() {
  return getRandomInt(2);
}

var urls = ['http://ec2-52-38-28-66.us-west-2.compute.amazonaws.com:3000/api/reviews', 'http://ec2-35-165-229-57.us-west-2.compute.amazonaws.com:3000/api/reviews']



app.get('/api/reviews', (req, res) => {
  console.log('recieving load balanced get request');
  let shoeId = req.query.shoe_id;
  let url = urls[getRandomIndex()]
  console.log('load balancer request url', url);
  request(url, {
    qs: {
      shoe_id: shoeId
    }
  }, (err, response, body) => {
    console.log('npm request response body', body);
    res.end();
  })
})

app.listen(port, () =>
  console.log(`Nike Review Component listening on bort ${port}!`)
);