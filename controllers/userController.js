const pg = require('pg');
var config = require('../DBconfig/config');
var pool = new pg.Pool(config);

module.exports = function(req, res){
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM accounts WHERE mail != '"+session.uniqueId+"'", function(err, result_1){
      done();
      if (err) {
        res.end();
        return console.error('error running query', err);
      }
      client.query("SELECT * FROM friend WHERE mail_f1 = '"+session.uniqueId+"'", function(err, result_2) {
        done();
        if (err) {
          res.end();
          return console.error('error running query', err);
        }
        res.render('users', {
        title: 'User',
        usr: result_1,
        fr: result_2,
        acc: session.uniqueId,
        name: session.name,});
      });
    });
  });
};