const mongodb = require('mongodb');
const getdb = require('../../utils/database').getDb;

module.exports = class Books {
    constructor(name, author, genre, fileUrl, userId) {
        this.name = name
        this.author = author
        this.genre = genre
        this.fileUrl = fileUrl
        this.createdByuser = userId
    }
    save() {
        const db = getdb()
        return db.collection('books')
            .insertOne(this)
            .then(() => {
                return 'uploaded successfully :)';
            })
            .catch(err => {
                console.log(err);
            })
    }
    static fetchAll() {
        const db = getdb();
        return db.collection('books')
            .find()
            .toArray()
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            })
    }
    static findByUser(id) {
        const db = getdb();
        return db.collection('books')
            .find({ createdByuser: id })
            .toArray()
            .then((data) => {
                return data
            })
            .catch(error => {
                console.log(error, "error from models/books/findByUser(function)")
            })
    }
    static delete(materialId, userId) {
        const db = getdb();
        return db.collection('books')
            .deleteOne({ _id: new mongodb.ObjectId(materialId), createdByuser: userId })
            .then((result) => {
                if (result) {
                    return true;
                }
                return false;
            })
            .catch(err => {
                console.log(err, "error from models/books/delete(function)");
            })
    }
    // static update(){
    //     const db=getdb();
    //     return db.collection('books')
    //     .updateOne()
    // }
}