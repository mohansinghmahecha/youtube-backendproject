## Description of project
My capstone project, with the title "YouTube Backend", was an ambitious project, in which I worked to build a sound backend infrastructure to handle subscriber management. With my project, I was able to explore backend development, the management of databases, and web hosting in more detail.  

Problem Statement: The problem I needed to solve was to create a scalable and efficient database to manage subscriber identifiers and to manage contact information submission mechanisms by way of retrieving subscriber information and updating other records, and making sure that the service could deliver a variety of expected requests.  A key component of this problem was the back-end system and the ease of managing that data with an interface, and host it on a live server.  

Approaches: To solve these problems, I used the following approaches: 


Database Management with MongoDB: I set up the database within MongoDB to store subscriber and manage data. The benefit of using MongoDB was its schema wasn’t inherently structural, which benefited the general construction of data management quite well. 


Serverless Functions and Hosting: To implement hosting service, I configured Netlify that could host static files and extends to serverless function management, which required creating functions to handle dynamic aspects such as contact information, and dynamically update front-end interface functionality. 


Local Development and Deployment: During local development, I was able to use MongoDB Compass to deploy the local databases. Once completed I migrated from my local deployment MongoDB instance to MongoDB Atlas to accommodate inbound requests in a cloud location. 

Error Handling and Testing: I implemented form of error handling to test the application during the initial stages, to overcome unforeseen incidents. 
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
|  |
| Primary Color | ![#A641DA](https://via.placeholder.com/10/A641DA?text=+) #A641DA |
| Black | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |


## Screenshots of project

![Main box](https://firebasestorage.googleapis.com/v0/b/for-pic-storages.appspot.com/o/almabetter-homepage.png?alt=media&token=b9df115e-083e-4c67-865d-743ca50573a1)







## Used By

This project is used by the following companies:

- Almabetter Project 


## Detials
Do not start server and connect to database inside app.js

app.js should only be used to handle request and response
Use index.js connect and start server


## Remember How To Use

 To run this project offline

```bash

*Only works if you have MongoDB installed in local machine*
  GET [http://localhost:3000/subscribers]
  GET [http://localhost:3000/subscribers/names]
  GET [http://localhost:3000/subscribers/:id]

  
```

Enter Data Into MongoDB and Must Be Connected With MongoDb Compass using
"mongodb://localhost:27017/youtube-backend"

```bash
npm i 
```
```bash
cd src
```
```bash
node createDatabase.js
```

it will start server in port 3000 , you must be in the "src" folder
```bash
 cd src
```


```bash
node index.js
```


```bash 
{
  "name": "youtube_subscriber",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest"
  },
 
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.5.2",
    "nodemon": "^3.1.4"
  }
}

```
## Deployed Link - Online

It is easy to use for the user who is suffering the internet this is home page of a website .

https://almabeteryoutube.netlify.app/
http://almabeteryoutube.netlify.app/




## 🚀 About Me
I'm a full stack developer...


##  images

![Response images](https://firebasestorage.googleapis.com/v0/b/for-pic-storages.appspot.com/o/detail-of-api.png?alt=media&token=5464baed-afac-4f98-9c01-848d198f6a3c)


![Response img2 ](https://firebasestorage.googleapis.com/v0/b/for-pic-storages.appspot.com/o/detail-of-api-online.png?alt=media&token=d1ac052a-dc2a-468c-a145-6b53f6508c7d)
