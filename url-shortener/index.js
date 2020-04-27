const app = require('express')();

const MongoClient = require('mongodb').MongoClient;

const dbUrl = process.env.MONGOLAB_URI; //using private local env variable in which password is stored


app.get('*', function (req, res) {
    let query = req.url.substr(1); //delete first dash from query string
    if (query == '') {
        res.send('empty call');
    } else {
        MongoClient.connect(dbUrl, function (err, client) {
            if (err) {
                throw err;
                console.log(`couldn't connect to db, error: ${err}`);
            } else {
                const db = client.db('prototype');
                console.log('inside database');
                const search = db.collection('url').find({
                    short_url: query
                }).next(function (err, doc) {
                    if (err) {
                        throw err;
                        console.log(err, `err in d oc`);

                    } 
                    if (doc) {
                        console.log(doc);
                        console.log('redirecting');
                        res.redirect(doc.original_url);
                        client.close();
                    }
                    if(query.startsWith('http')){
                        //TODO: prevent same url from being written
                        const insertion = {
                            original_url: query,
                            short_url: Math.floor(Math.random() * 10000).toString(),//TODO: improve for consistent 4 or 5 digits
                        };
                        db.collection('url').insert(insertion, function (err, result){
                            if(err) throw err;

                            res.send(JSON.stringify(insertion));
                            client.close();
                        });
                        
                    }
                });


            }
           
        });
    }
}).listen(8080);