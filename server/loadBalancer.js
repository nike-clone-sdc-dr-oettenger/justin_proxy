const express = require('express');
const app = express();
const port = 4069;
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
//app.use(express.static('../public/dist'));
app.use(bodyParser());

app.use(cors());

var urls = ['instance1', 'instance2', 'instance3']

app.get('/abc', (req, res) => {
  console.log('get request to load balancer');
  //send random url's bundle
  request('ec2-52-38-28-66.us-west-2.compute.amazonaws.com:3000/bundle.js', (err, response, body) => {
    res.send(body);
  })
})

app.listen(port, () =>
  console.log(`Nike Review Component listening on bort ${port}!`)
);