const pg = require('pg');
const bodyParser = require('body-parser');

var config = require('../DBconfig/config');
var pool = new pg.Pool(config);
var document;

module.exports = function(req, res){
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        session = req.session;
        var acc = req.body.email;
        var pas = req.body.pwd;

        client.query("SELECT * FROM accounts WHERE password = '"+pas+"' AND mail = '"+acc+"'", function(err, result) {
            done();
            if (err) {
                res.end();
                return console.error('error running query', err);
            }
            if(result.rows[0] != null){
                session.uniqueId = acc;
                session.name = result.rows[0].name;
                res.redirect('/messageReceived');
            }
            else{
                res.redirect('/login');
            }
        });
    });
};