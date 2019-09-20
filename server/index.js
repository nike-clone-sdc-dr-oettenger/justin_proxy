const express = require('express');
const request = require('request');
const proxy = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 6969;
const axios = require('axios');

proxy.use(cors());
proxy.use(bodyParser.json());
proxy.use(express.static('client'));
proxy.use(bodyParser.urlencoded({ extended: true }));

const reviewsUrl =
  'http://productinforeviews-env.ergwvejvxp.us-east-2.elasticbeanstalk.com/api/reviews';

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
});
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

proxy.listen(port, () =>
  console.log(`Proxy Server listening on port ${port}!`)
);
