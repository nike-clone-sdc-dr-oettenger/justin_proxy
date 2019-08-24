const express = require('express');
const proxy = express();
const bodyParser = require('body-parser');
const axios = require('axios');

const mayLikeUrl = 'http://localhost:1128/shoes';
const imageUrl = 'http://localhost:1121/api/images';
const reviewsUrl = 'http://localhost:3000/';

const port = 6968;
proxy.use(bodyParser.json());

proxy.use(express.static('client'))

// proxy.use('mayLike', )
proxy.get(reviewsUrl, (req, res) => {
  console.log('heres the request,', req);
  console.log('heres the response', res);
  res.send(200).send(res);
});

proxy.listen(port, () =>
  console.log(`Proxy Server listening on port ${port}!`)
);

proxy.all('youMayLike/*', (req, res) => {
  console.log(`Redirecting your requrest to ${mayLikeUrl}.`);

  axios
    .get({
      url: '/shoes',
      proxy: {
        host: '127.0.0.1',
        port: 1128
      }
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      alert(err);
    });
});

proxy.all('imageUrl/*', (req, res) => {
  console.log(`Redirecting your requrest to ${imageUrl}.`);
  axios
    .get({
      url: '/api/images',
      proxy: {
        host: '127.0.0.1',
        port: 1121
      }
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      alert(err);
    });
});

proxy.all('reviewsUrl/*', (req, res) => {
  console.log(`Redirecting your requrest to ${reviewsUrl}.`);
  axios
    .get({
      url: 'api/reviews',
      proxy: {
        host: '127.0.0.1',
        port: 3000
      }
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      alert(err);
    });
});
