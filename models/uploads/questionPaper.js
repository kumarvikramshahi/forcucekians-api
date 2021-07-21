const mongodb = require('mongodb');
const getdb = require('../../utils/database').getDb;

module.exports = class QuestionPaper {
    constructor(name, subject, examType, fileUrl, userId) {
        this.name = name
        this.subject = subject
        this.examType = examType
        this.fileUrl = fileUrl
        this.createdByuser = userId
    }
    save() {
        const db = getdb()
        return db.collection('questionPaper')
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
        return db.collection('questionPaper')
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
        return db.collection('questionPaper')
            .find({ createdByuser: id })
            .toArray()
            .then((data) => {
                return data
            })
            .catch(error => {
                console.log(error, "error from models/questionPaper/findByUser(function)")
            })
    }
    static delete(materialId, userId) {
        const db = getdb();
        return db.collection('questionPaper')
            .deleteOne({ _id: new mongodb.ObjectId(materialId), createdByuser: userId })
            .then((result) => {
                if (result) {
                    return true;
                }
                return false;
            })
            .catch(err => {
                console.log(err, "error from models/questionPaper/delete(function)");
            })
    }
    // static update(){
    //     const db=getdb();
    //     return db.collection('questionPaper')
    //     .updateOne()
    // }
}