let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/virtualMeetApp', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', function(err) {
        console.error(err.message);
    })
    .on('open', function() {
        console.debug('Database Connection successful');
    });

module.exports = db;
