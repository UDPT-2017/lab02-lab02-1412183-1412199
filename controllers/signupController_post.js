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
        var acc = req.body.email;
        var pas = req.body.pwd;
        var name = req.body.name;
        var phone = req.body.phone;

        client.query("SELECT mail FROM accounts WHERE mail = '"+acc+"'", function(err, result){
            done();
            if (err) {
                res.end();
                return console.error('error running query', err);
            }
            if(result.rows[0] != null){
                //tai khoan da ton tai
                res.redirect('./signup');
            }
            else{
                client.query("INSERT INTO accounts (mail, password, name, phone) VALUES ('"+acc+"','"+pas+"','"+name+"','"+phone+"')", function(err, result_2) {
                    done();
                    if (err) {
                        res.end();
                        return console.error('error running query', err);
                    }
                    session.uniqueId = acc;
                    session.name = name;
                    res.redirect('./messageReceived');
                });
            }
        });
    });
};