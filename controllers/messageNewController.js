const pg = require('pg');
var config = require('../DBconfig/config');
var pool = new pg.Pool(config);

module.exports =  function(req, res){
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM message as mes, accounts as acc WHERE mail_sender = mail AND mail_receiver = '"+session.uniqueId+"' ORDER BY time DESC", function(err, result){
      done();
      if (err) {
        res.end();
        return console.error('error running query', err);
      }
      res.render('messageNew', {
      title: 'Message',
      mes: result,
      acc: session.uniqueId,
      name: session.name,
      });
    });
  });
};