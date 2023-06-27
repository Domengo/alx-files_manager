const express = require('express');

const app = express();

app.use(express.static('public'));
const port = 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
