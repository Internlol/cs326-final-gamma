# Team Gamma

## Fitness Scheduler

## Spring 2020

## Overview:

For our final project submission we have created an application that allows users to create and manipulate fitness data. Users can create exercises, workouts, routines and also interact with calendars. Our application enables users to descriptively break down every aspect of their fitness regiment starting from exercises data type and working up to routines data type. We have implemented a hierarchal structure of data that allows users to easily build from exercises (which are at the core of any fitness plan) to more complex data. Originally we set out to create an application that accomodated the unique and specific aspects of any user's fitness plan while also allowing them to schedule on a calendar (that could be easily exported/integrated with Google Calendars). Our idea is unique in that most (if not all) fitness related applications track information like calories burned or heart rate or other data generated from fitness activities, but our app instead seeks to allow users to create and capture unique structures in their fitness plan (we specifically have trainers, coaches in mind who require detailed plans).

### Team Members
| Member        | Github ID         |
|---------------|---------------|
| Aaron Quang   |  Internlol    |
| Arnold Joseph |  arnold-j     |
| Nadeem Farhat |  nadeemfarhat |

### User Interface

* Index/Dashboard page: the home page for the user from where they can access all their application data. Page: index.html
![index](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/index3.png)
* My Exercises/My Workouts/My Routines: a list view of all of users available data (for a give data type i.e. exercises). From this page users can delete their existing data, view existing data, or select to edit (update) existing data. Pages: myexercises.html, myworkouts.html, myroutines.html
![myexercises](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/myexercisesfinal.png)
![myworkouts](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/myworkoutsfinal.png)
![myroutines](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/myroutinesfinal.png)
![view](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/viewfinal.png)
* My Calendars: user can view their publicly available Google Calendars. Page: mycalendars.html
![mycalendars](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/mycalendarsfinal.png)
* Create Exercise: create an exercise data type. Page: createexercise.html
![createexercise](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/createexercisefinal.png)
* Create Workout: create a workout data type. Page: createworkout.html
![createworkout](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/createworkoutfinal.png)
* Create Routine: create a routine data type. Page: createroutine.html
![createroutine](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/createroutinefinal.png)
* Edit Exercise: edit an existing exercise data. Page: editexercise.html
![editexercise](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/updateexercisefinal.png)
* Login/Account: Login page for user and user account. Currently not functional. Page: login.html, account.html
![login](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/loginfinal.png)
![account](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/accountfinal.png)
* About: about our application. Page: about.html
![about](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/aboutfinal.png)

### API

##### Create Exercise
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| Exercise data | Exercise data is JSON with values for name, description and set data| {name: "pushups", desc: "some pushups", setData: [{'repCount':'12','setLength':'','restTime':'30'}]}|

##### Read Exercise
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| name | Name of the exercise for .../readOne | {name: "pushups"}|

##### Update Exercise
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| Exercise data | Exercise data is a JSON with values for name, description and set data| {name: "pushups", desc: "some pushups", setData: [{'repCount':'12','setLength':'','restTime':'30'}]}|

##### Delete Exercise
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| name | Name of the exercise for .../delete | {name: "pushups"}

##### Create Workout
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| Workout data | Workout data is JSON with values for name and Exercise data| {name: "pushups", exerciseData: [array of Exercise data]}|

##### Delete Workout
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| name | Name of the workout | {name: "workout1"}

##### Create Routine
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| Routine data | Routine data is JSON with values for name and workout data| {name: "pushups", workoutData: [array of {Workout data, start time, end time}]}|

##### Delete Routine
| Parameter/Request Body| Description| Example|
|-------------------|------------|--------|
| name | Name of the Routine | {name: "routine1"}


### Database


Exercise Document structure

{
  
  _id: <ObjectId1>,
  
  name: String // name of the exercise
  
  desc: String // exercise description
  
  setData:  Array // list of sets

}

The exercise is the smallest unit and contains three basic components. Set data is an array of JSON (that describes the sets that make up exercise).

Workout Document Structure:

{
  
  _id: <ObjectId1>,
  
  name: String // name of the workout
  
  exerciseData:  Array // list of exercises

}

Workout data is defined by two components. Exercise data is an array of Exercise documents (the entire exercise document above is a member of the array).

Routine Document Structure:

{
  
  _id: <ObjectId1>,
  
  name: String // name of the routine
  
  workoutData:  Array // list of workouts

}

Routine data is defined by two main components. To specify workoutData: it is made of JSON which have the form {workout document, start time, end time}. As you can see we again encapsulate some of our existing data types into the new data type basically making the new data type a superset of smaller ones.

### URLs

| URL        | function         |
|---------------|---------------|
| https://fast-tundra-84247.herokuapp.com/users/exercises/create   |  create an exercise datatype   |
|https://fast-tundra-84247.herokuapp.com/users/workouts/create | create a workout datatype. |
|https://fast-tundra-84247.herokuapp.com/users/routines/create | create a routines datatype |
|https://fast-tundra-84247.herokuapp.com/users/exercises/readOne | read a single entry of given datatype (see url) |
|https://fast-tundra-84247.herokuapp.com/users/routines/readOne | |
|https://fast-tundra-84247.herokuapp.com/users/workouts/readOne| |
|https://fast-tundra-84247.herokuapp.com/users/exercises/readAll| read all database entries of given datatype |
|https://fast-tundra-84247.herokuapp.com/users/routines/readAll
|https://fast-tundra-84247.herokuapp.com/users/workouts/readAll
|https://fast-tundra-84247.herokuapp.com/users/exercises/update| update single entry of given datatype |
|https://fast-tundra-84247.herokuapp.com/users/routines/update | | 
|https://fast-tundra-84247.herokuapp.com/users/workouts/update| |
|https://fast-tundra-84247.herokuapp.com/users/exercises/delete| delete single entry |
|https://fast-tundra-84247.herokuapp.com/users/workouts/delete| |
|https://fast-tundra-84247.herokuapp.com/users/routines/delete| |

### Authentication/Authorization

We did not have the time to get a grasp of authentication/authorization. Given more time it would have played a role in providing each user with their own unique data (instead of one public user), as well as giving us a way to integrate with Google API

### Division of Labor

Aaron (internlol): dashboard/index, login page, about page, settings page, create calendar page, css file, wireframes, milestone1.md, Heroku deployment, createworkout,js, server routing/server/mongodb, Edit and Delete functions for viewworkout (editworkout.js, deleteworkout.js), bugfixes for JSON response body, implemented getExercise, getAllExercise in mongodb.ts, front-end view buttons for myexercises.html/myexercises.js, workout CRUD operations in mongodb.ts

Arnold (arnold-j): dashboard/index, create workout, myworkouts, create routine, my routines, wireframes, milestone1.md, createexercise.js, myexercises.js, server-routing.ts, tsc (ts --> js) compilation, implemented createExercise in mongodb.ts, more routes (for workouts and routines) in server-routing.ts, front-end functionality for routines: createroutine.js, myroutines.js

Nadeem (nadeemfarhat): dashboard/index, wireframes, create exercise, myexercises, mycalendars, create routine, milestone1.md, createexercise.html, createexercise.js, myexercises.js, editexercise.html, editexercise.js, server-routing.ts, implemented deleteExercise in mongodb.ts, front-end talking to server in myworkouts.js, createworkout.js

### Conclusion

Overall this project required a lot of time and effort. Over the course of the semester working on this project, we picked up many skills such as full stack development and experience with the latest web technologies like NodeJS. During the design and implementation process, we ran into multiple difficulties. In the design process we were unsure of what structure the web page should take as there were many viable designs. We also had to determine what pages we should flesh out such that the user can easily create, update, and delete the data types we are offering (in ways that we could also implement easily). Something we spent lots of time thinking about was the layout of our files - lots of pages can become redundant, and a better design for what we envisioned definitely existed. Though overall the design phase was fairly straightforward, more problems started to arise during implementation of front end and back end where design needed to come to life.  During implementation we also ran into issues such as merge conflicts, conflicting branches, etc. which we eventually learned to solve and overcome. Another difficulty we had was navigating the amount of code that we had written, since we are less experienced with Javascript we found verbose ways of coming up with solutions (to select list items for example), which then was difficult to parse again and keep coherent and more importantly functional when adding new code. Though to somewhat aid us in the front end javascript we used external libraries to help with the interactivity of our application. For the backend we found that setting up routes using Express was fairly straightforward, and that having these routes lead to database operations (in milestone 3) also proved to be doable. Though the structure of our data did become more complicated and perhaps unnecessarily so. Yet another difficulty we encountered while working through the project was the fact that authentication hadn’t been implemented, which messed with our implementation of adding and integrating with google calendar. The step of implementing the google API was massive, we didn’t realize that we needed to apply to use the API, leaving us without time to become verified. Without the authentication, we tried a workaround implementation using a single user which is mostly effective at demonstrating our app. Something that we would’ve liked to know and learn beforehand is using external APIs to integrate with our own app (Google’s API requires OAuth v2 and app verification to use APIs, which we overlooked). 
