const pg = require('pg');
const bodyParser = require('body-parser');

var config = require('../DBconfig/config');
var pool = new pg.Pool(config);

var urluncodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(req, res){
  res.render('signup', {
        title: 'Signup',
      });
};