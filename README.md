# forcucekians-backend-api
forcucekians is made for collage students, where they can upload and download materials like books, notes etc., this repositary is backend of [forcucekians]( https://forcucekians.me/ ) .
<br/><br/>
[forcucekians frontend repo]( https://github.com/kumarvikramshahi/forcucekians-frontend )

### Technology Stack
* Node.js - JavaScript runtime environment
* Express.js - Web application framework for Node.js
* Mongodb - document-oriented DBMS

### Local Installation
Note: Before installing make sure that you have 'Node.js' & 'git' installed in your computer.
* Go to folder where you want install this repo.
* Right click and you will get some options.
* Click on ' Git Bash Here ' and you will get a linux like [CLI](https://en.wikipedia.org/wiki/Command-line_interface).
* Run command " git clone https://github.com/kumarvikramshahi/forcucekians-backend-api.git ".
* After installing run " cd forcucekians-backend-api "
* Run command "npm install" (this will install all dependencies).
* npm start (it will start server).

### This project will solve problems of :-
* those students who don’t prepare their own notes and rush for it when exams are about to get started.
* forwarding same material many times (just upload here and it will be accessible by anyone).

### It gives access to collection of :-
* notes 
* previous year question papers and
* Books

*you can also use already built UI (" https://forcucekians.me/ ").*

#### Server = https://forcucekians.herokuapp.com
### Endpoints :-
<br/>

> /books

**method = GET**
<br/>
response :-

```

{
    "status": 200,
    "data": [
        {
            "_id": "60fa7c1ae9c10e00041d83a6" 
            "name": "COMEDY OF ERRORS" 
            "author": "William Shakespeare" 
            "genre": "comedy" 
            "fileUrl": "https://www.jiocloud.com/s/?t=nGgBmOIbTJeOJGUi&s=a6" 
            "createdByuser": "60fa7604e9c10e00041d8396" 
        }
    ]
}

```
<hr/>

> /notes

**method = GET**
<br/>
response :-

```

{
    "status": 200,
    "data": [
        {
            "_id": "60fa76a3e9c10e00041d8397"
            "name": "basic electrical communication Module_2 by Jasmin mam"
            "shortName": "bEC"
            "fileUrl": "https://www.jiocloud.com/s/?t=bYekGAClOVewHJYJ&s=a6"
            "createdByuser": "60fa7604e9c10e00041d8396"
        }
    ]
}

```
<hr/>

> /questionPaper

**method = GET**
<br/>
response :-

```

{
    "status": 200,
    "data": [
        {
            "_id": "60fa7ffde9c10e00041d83ae"
            "name": "CP 2nd sem 2018 (2015 scheme) external"
            "subject": "Computer Programming"
            "examType": "external"
            "fileUrl": "https://www.jiocloud.com/s/?t=kDRtsmxnLBmHRUIX&s=a6"
            "createdByuser": "60fa7604e9c10e00041d8396"
        }
    ]
}

```
<hr/>

Those are few endpoints that you can use in your projects, for more extra endpoints you can explore this repo.
