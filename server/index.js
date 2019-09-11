const express = require('express');
const proxy = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 6969;

proxy.use(cors());
proxy.use(bodyParser.json());
proxy.use(express.static('client'));

proxy.listen(port, () =>
  console.log(`Proxy Server listening on port ${port}!`)
);
