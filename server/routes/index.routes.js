var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('*', function(req, res, next) {
    res.render('index', { title: 'Express and React' });
});


module.exports = router;

/*
var express = require('express');
var router = express.Router();

var React = require('react');
var renderToString = require('react-dom/server').renderToString;
var match = require('react-router').match;
var RouterContext = require('react-router').RouterContext;
var routes = require('../../client/routes');


router.get('*', function(req, res) {
   match({ routes: routes, location: req.url }, function(err, redirect, props) {
      const appHtml = renderToString(<RouterContext {...props} />);
      res.send(renderPage(appHtml));
   });
});

function renderPage(appHtml) {
    return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `;
}*/
