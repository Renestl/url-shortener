# URL Shortener Microservice

This fullstack JavaScript app uses [ExpressJS](http://expressjs.com/), [NodeJS](https://nodejs.org/), [MongoDB](https://www.mongodb.com/) to create a url shortening microservice.

### Installation
* Clone the repository: ``.
* Install dependencies: `npm install`.
* Start server: `node app.js`

### MongoDB
In order to use this application, you must have a mongod server running and configure to use that server.

### Example Creation Usage:
https://localhost.herokuapp.com/new/https://www.google.com

https://localhost.herokuapp.com/new/http://foo.com:80

### Example Creation Output:
{ "original_url":"http://foo.com:80", "short_url":"https://localhost.herokuapp.com/8170" }

### Usage: 
https://localhost.herokuapp.com/2871

### Will Redirect To:
https://www.google.com/