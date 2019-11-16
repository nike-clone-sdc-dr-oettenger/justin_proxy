const express = require('express');
const request = require('request');
const proxy = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 6969;
const axios = require('axios');


proxy.use(cors());
proxy.use(bodyParser.json());
proxy.use(express.static('../client'));
proxy.use(bodyParser.urlencoded({ extended: true }));

const reviewsUrl =
  'http://ec2-52-38-28-66.us-west-2.compute.amazonaws.com/api/reviews';
/* justins code uncomment later
proxy.get('/api/reviews', (req, res) => {
  // res.status(200).send('endpoint');
  console.log(req.query.shoe_id, 'shoe id');
  console.log('request going to microservice');
  axios
    .get(reviewsUrl, {
      params: {
        shoe_id: req.query.shoe_id
      }
    })
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});*/


// proxy.all('/api/reviews', (req, res) => {
//   console.log(`Redirecting request to ${reviewsUrl}.`);
//   console.log(req.body);
//   let options = {
//     url: `${reviewsUrl}`,
//     method: req.method,
//     qs: req.query
//   };
//   request(options, (err, response) => {
//     if (err) {
//       alert(err);
//     }
//     let body = JSON.parse(response.body);
//     res.status(200).send(body);
//   });

//   // axios.get('/');
// });

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var getRandomIndex = function() {
  return getRandomInt(2);
}

var urls = ['http://ec2-52-38-28-66.us-west-2.compute.amazonaws.com:3000/api/reviews', 'http://ec2-35-165-229-57.us-west-2.compute.amazonaws.com:3000/api/reviews']



proxy.get('/api/reviews', (req, res) => {
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


proxy.listen(port, () =>
  console.log(`Proxy Server listening on port ${port}!`)
);


/*

What do i need to do
make a load balancer
the load balancer exists on the proxy in a script tag
  lets start with 2 instances
  load balancer makes a get request to the instance using npm request
  the instance res.sends the bundle
  
  switch randomly between the two


*/