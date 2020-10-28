#Generic API microservice

This app is intended as template to use to develop microservices to serve as API e interact with tools or perform specific functions.

To create functions you need to perform 2 steps:
 - Add routes on /server/routers/<your-custom-route.js>
 - Add functions on /server/lib/<your-library-functions.js>

When adding a route it is needed to add it also on /server/routers/index.js as this app load all routes from there.
When using additional npm modules it is needed to add them on package.json
All configuration should be taken from environmental variables but for testing purposes the file /server/config/local.json can be used.
No confidential information should be put on local.json and commited to the repository.