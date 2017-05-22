const pg = require('pg');
const bodyParser = require('body-parser');

var config = require('../DBconfig/config');
var pool = new pg.Pool(config);

module.exports = function(req, res){
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        session = req.session;
        var receiver = req.body.email;
        var content = req.body.cont;

        client.query("SELECT * FROM friend WHERE mail_f1 = '"+session.uniqueId+"' AND mail_f2 = '"+receiver+"'", function(err, result_1){
            done();
            if (err) {
                res.end();
                return console.error('error running query', err);
            }
            if(result_1.rows != null){
                client.query("INSERT INTO message(mail_receiver, mail_sender, time, contents, status) VALUES ('"+receiver+"','"+session.uniqueId+"','now()','"+content+"','c')", function(err, result){
                    done();
                    if (err) {
                        res.end();
                        return console.error('error running query', err);
                    }
                    res.redirect('./messageSent'); 
                });
            }
            else{
                res.send("Receiver is not friend.. Go back");
            }
        });
    });
};