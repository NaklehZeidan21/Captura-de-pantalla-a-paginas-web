const express = require('express');
const phantom = require('phantom');

const app = express();


app.get('/screenshot', async (req, res) => {
  const url = req.query.url;

  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.open(url);
  const screenshot = await page.renderBase64('PNG');

  // send the screenshot as a response to the index.html file
  res.send(`
    <html>
      <head>
      </head>
      <body>
        <h1>Captura:</h1>
        <img src="data:image/png;base64,${screenshot}" />
      </body>
    </html>
  `);

  await instance.exit();
});

app.get('/', (req, res) => {
  // render the index.html file
  res.sendFile(__dirname + '/public'+ '/index.html');
});

app.listen(3333, () => {
  console.log('Server listening on port 3333');
});
