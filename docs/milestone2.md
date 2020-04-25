# Team Gamma: Milestone 2

## Part 0: Project API & Part 2: Front End Implementation
For Milestone 2 we have created an API to work with exercises which are one of the four types of data that we support in our application (the other types being workouts, routines, and calendars). For this milestone users will be able to ping endpoints for CRUD (Create, Read, Update, Delete) operations; the API endpoints will respond with dummy messages from the server side. 

### Create Exercise

#### Overview

To access our create functionality visit: https://fast-tundra-84247.herokuapp.com/createexercise.html

At this page users will fill in information about the exercise, and when the user clicks on "Save and Add Exercise" there will be a call to our create API endpoint which will add the exercise to a list of exercises (the list of exercises will be specific to users although the functionality does not currently exist for user data).

#### Endpoint URI and parameters

The URI for create: https://fast-tundra-84247.herokuapp.com/users/exercises/create

This endpoint will make a POST request to the server.

| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| Exercise data | Exercise data is JSON with values for name, description and set data| {name: "pushups", desc: "some pushups", setData: [{'repCount':'12','setLength':'','restTime':'30'}]}|

#### Response

The server responds with JSON signaling the exercise has been succesfully created.

#### Images (for Part 2)

Creating the exercise on the front end:
![create exercise 1](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/milestone2create.png)

After the exercise has been created, added to My Exercises list 
![create exercise 2](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/milestone2create2.png)

### Read Exercise

#### Overview

To access our read functionality visit: https://fast-tundra-84247.herokuapp.com/myexercises.html

At this page users will find a list of exercises that are "stored" by the database (currently we have crude, "dummy" way of mimicking server/database that will be implemented next milestone). On visiting this page, there will be a request sent to the read endpoint asking for all the exercises. 

#### Endpoint URI and parameters

The URIs for read: 

https://fast-tundra-84247.herokuapp.com/users/exercises/readAll

https://fast-tundra-84247.herokuapp.com/users/exercises/readOne


This endpoint will make a POST request to the server.

| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| name | Name of the exercise for .../readOne | {name: "pushups"}|

#### Response

readOne: The server responds with JSON containing the specified exercise.
readAll: server responds with array of JSONs (each JSON representing stored exercise).

#### Images (for Part 2)

Reading the exercises on the front end:
![read exercise 1](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/milestone2read.png)

### Update Exercise

#### Overview

To access our update functionality visit: https://fast-tundra-84247.herokuapp.com/myexercises.html and hit the "Edit" button on the cell containing the exercise you would like to update.

To update an exercise users must select a specific exercise from the list of all exercises. This will load the exercise in an editing view (https://fast-tundra-84247.herokuapp.com/editexercise.html)

#### Endpoint URI and parameters

The URIs for read: 

https://fast-tundra-84247.herokuapp.com/users/exercises/update

This endpoint will make a POST request to the server.

| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| Exercise data | Exercise data is a JSON with values for name, description and set data| {name: "pushups", desc: "some pushups", setData: [{'repCount':'12','setLength':'','restTime':'30'}]}|

#### Response

Server responds with JSON signalling the specified exercise was updated.

#### Images (for Part 2)

Editing the exercise on the front end:
![update exercise 1](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/milestone2update.png)

Result of updating or editing the exercise:
![update exercise 1](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/milestone2update2.png)
