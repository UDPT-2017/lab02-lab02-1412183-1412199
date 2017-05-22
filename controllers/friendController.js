const pg = require('pg');
var config = require('../DBconfig/config');
var pool = new pg.Pool(config);

module.exports = function(req, res){
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM friend as fr, accounts as acc WHERE acc.mail = fr.mail_f2 AND mail_f1 = '"+session.uniqueId+"'", function(err, result){
      done();
      if (err) {
        res.end();
        return console.error('error running query', err);
      }
      res.render('friend', {
      title: 'Friend',
      fr: result,
      acc: session.uniqueId,
      name: session.name,});
    });
  });
};