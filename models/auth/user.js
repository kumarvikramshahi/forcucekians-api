const mongodb = require('mongodb');
const getdb = require('../../utils/database').getDb;

module.exports = class User {
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.passwd = password
    }
    create() {
        const db = getdb()
        return db.collection('user')
            .insertOne(this)
            .then((user) => {
                return user.ops  // it returns created user data in form of array of objects.
            })
            .catch(err => {
                console.log(err, "error at model/user.js");
            })
    }
    static find(email) {
        const db = getdb();
        return db.collection('user')
            .findOne({ email: email })
            .then(user => {
                return user
            })
            .catch(error => {
                console.log(error, "error from models/user/find(function)")
            })
    }
    static update(password) {
        const db = getdb();
        return db.collection('user')
            .updateOne({ passwd: password })
            .then(() => {
                return "password changed successfully"
            })
            .catch(err => {
                console.log(err, "error from models/user/update(function)")
            })
    }
}