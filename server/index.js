const express = require('express');
const proxy = express();
const bodyParser = require('body-parser');
const axios = require('axios');

const port = 6969;
proxy.use(bodyParser.json());

proxy.listen(port, () =>
  console.log(`Proxy Server listening on port ${port}!`)
);

proxy.get('/api/reviews', (req, res) => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:3000/api/reviews'
  });
});

//commit

//for potential shoe info from marcus's database

// proxy.get('/shoes', (req, res) => {
//   axios({
//     method: 'get',
//     url: 'http://127.0.0.1:1128/api/reviews'
//   });
// });
