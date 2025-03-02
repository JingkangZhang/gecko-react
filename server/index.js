require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
var cookieParser = require('cookie-parser');

const sessionOpts = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
};

const app = express();

app.use(session(sessionOpts));
app.use(cookieParser());

app.use(express.static(path.join(path.dirname(__dirname), 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'build', 'index.html'));
});

app.get('/services/zotero/authenticate', require('./services/zotero/authenticate'));
app.get('/services/zotero/verify', require('./services/zotero/verify'));
app.get('/services/zotero/login', require('./services/zotero/login'));
app.get('/services/zotero/getCollections', require('./services/zotero/getCollections'));
app.get('/services/zotero/getItemsInCollection', require('./services/zotero/getItemsInCollection'));
app.post('/services/zotero/addItems', require('./services/zotero/addItems'));

app.listen(process.env.PORT || 8080, () => console.log('CitationGecko server listening...'));
