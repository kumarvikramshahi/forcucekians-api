const mongodb = require('mongodb');
const getdb = require('../../utils/database').getDb;

module.exports = class Notes {
    constructor(name, shortName, fileUrl, userId) {
        this.name = name
        this.shortName = shortName
        this.fileUrl = fileUrl
        this.createdByuser = userId
    }
    save() {
        const db = getdb()
        return db.collection('notes')
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
        return db.collection('notes')
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
        return db.collection('notes')
            .find({ createdByuser: id })
            .toArray()
            .then((data) => {
                return data
            })
            .catch(error => {
                console.log(error, "error from models/notes/findByUser(function)")
            })
    }
    static delete(materialId, userId) {
        const db = getdb();
        return db.collection('notes')
            .deleteOne({ _id: new mongodb.ObjectId(materialId), createdByuser: userId })
            .then((result) => {
                if (result) {
                    return true;
                }
                return false;
            })
            .catch(err => {
                console.log(err, "error from models/notes/delete(function)");
            })
    }
    // static update(){
    //     const db=getdb();
    //     return db.collection('notes')
    //     .updateOne()
    // }
}