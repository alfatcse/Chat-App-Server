### Introduction
This Project is an innovative chat application that leverages modern technologies such as Socket.io, React, React Bootstrap, HTML, CSS, and more to deliver a dynamic and interactive messaging experience. With its robust features and seamless integration, ChatApp allows users to connect, communicate, and express themselves in real-time with other users from around the world.
 
### Project Features
* User can register into the application.
* User can login into the application.
* User can select an emoji as profile picture.
* Real time conversation can be carried out among the users.
* In between the conversation emoji can be used.  
### Usage
* Run npm start:dev to start the application.
* Connect to the API using Postman on port 5009.
## Live Link:     [http://Chat-App-Server:4000](http://18.197.51.51:4000/)  
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST |api/v1/user/register | To Create new User |
| POST |api/v1/user/login | To Log in new user|
| POST |api/v1/setAvatar/:id | To set Avatar as profile picture|
| GET  |api/v1/allusers/:id | To get all the registered users|
| POST  |api/v1/addmsg | To send message any of the registered users|
| GET  |api/v1/getallmessages | To retrive all conversations of a specific user|
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Socket.IO](https://socket.io/) Socket.IO is an event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. It consists of two components: a client, and a server. Both components have a nearly identical API.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.
<hr>
### Sample Data: (User)

```json
{
     "username": "Müller",
     "email": "müller@gmail.com",
     "password": "12345678" 
     "avatarImage": "",
     "isAvatarImageSet": false
}
```
### Create a new User 
 Route:  api/v1/user/register (POST)
 
 Request body:
 ```json
 {
     "username": "Müller",
     "email": "müller@gmail.com",
     "password": "12345678" 
     "avatarImage": "",
     "isAvatarImageSet": false
}
```
 Response: The newly created user object.
 Response Sample Pattern:
```json
 {
      "status":"success" , 
      "message": "Data Inserted",
      "data": {
               "username": "Müller",
               "email": "müller@gmail.com",
               "password": "",//in hash format 
              "avatarImage": "",
             "isAvatarImageSet": false
              }, 
}
```        
### Login User

 Route:  api/v1/user/login (POST)
 
 Request body:
 ```json
  {
     "username": "Müller",
     "password": "12345678" 
  }
```
 Response: The user's array of objects.
 Response Sample Pattern:
```json
 {
      "status":"success" , 
      "message": "Data Retrived",
      "data": {
               "username": "Müller",
               "email": "müller@gmail.com",
               "password": "", //in hash format 
               "avatarImage":"PHuNTQx=PHN2ZyB4bmYwMDAwOyIvPjwvc3ZnPg===",
               "isAvatarImageSet": false
              }, 
}
```   

### Set avatar of a Single User

Route:  /api/v1/setAvatar/:id (POST)

Request Param: :id

 Request body:
 ```json
  {
     "_id": "" //id of the single user,
     "avatarImage": "PHuNTQx=PHN2ZyB4bmYwMDAwOyIvPjwvc3ZnPg===" 
  }
```

Response: The specified user object.

Response Sample Pattern:

```json
  {
      "success": "success", 
      "message": "Avatar Image set successfully",
  }
  ```  
  ### Get all Users

 Route:  /api/v1/allusers/:id (GET)
 
 Request Param: :id
 
 Response:  The array of all user object.
 
 Response Sample Pattern:
 
```json
  {
      "success": "success", 
      "message": "All Uers retrived successfully",
      "data": [{},{}...], 
  }
```

### Send message to any of the registered user

Route:  api/v1/addmsg (POST)

Request body:

```json
 {
    "message":"",  //Message to send
    "sender":"",   //Sender Id
    "reciver":"",  //Reciver Id
    "createdAt":"" //Time Stamp
}

```
 
 Response:Sent message .

 Response Sample Pattern:

```json
 {
      "success": "success", 
      "message": "Message sent successfully",
      "data":  "" //Sent message
  }
```
### Get all conversations of a specific user           

Route:  api/v1/getallmessages (GET)

Request body:

```json
 {
    "sender":"",   //Sender Id
    "reciver":"",  //Reciver Id
}

```
 
 Response:Retrive all messages .

 Response Sample Pattern:

```json
 {
      "success": "success", 
      "message": "Message sent successfully",
      "data":  [{},{}....] //Sent message
  }
```

### Error Handling:
Error Response Object include the following properties:
- success  →  false
- message → Error Type → Validation Error, Cast Error, Duplicate Entry
- errorMessages 
- stack

### Sample Error Response

```json
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\operations\\insert.ts:85:25\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\cmap\\connection_pool.ts:574:11\n    at H:\\next-level-development\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```

 
