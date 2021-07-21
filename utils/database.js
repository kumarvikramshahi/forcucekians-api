const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.p8tg6.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err.message, "- error from utli mongoconnect")
        })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    console.log("error from utils database section getDB function");
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;