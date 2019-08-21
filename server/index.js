const express = require('express');
const proxy = express();

const port = 6969;

proxy.listen(port, () => console.log(`Example app listening on port ${port}!`));
