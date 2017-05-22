const pg = require('pg');
var config = require('../DBconfig/config');
var pool = new pg.Pool(config);

module.exports = pool.connect(function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM accounts', function(err, result) {
        done();
        if (err) {
            res.end();
            return console.error('error running query', err);
        }
        res.send(result.rows[0].name);
    });
});

