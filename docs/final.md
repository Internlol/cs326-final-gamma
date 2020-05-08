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
* My Exercises/My Workouts/My Routines: a list view of all of users available data (for a give data type i.e. exercises). From this page users can delete their existing data, view existing data, or select to edit (update) existing data. Pages: myexercises.html, myworkouts.html, myroutines.html
* My Calendars: user can view their publicly available Google Calendars. Page: mycalendars.html
* Create Exercise: create an exercise data type. Page: createexercise.html
* Create Workout: create a workout data type. Page: createworkout.html
* Create Routine: create a routine data type. Page: createroutine.html
* Edit Exercise: edit an existing exercise data. Page: editexercise.html
* Login/Account: Login page for user and user account. Currently not functional. Page: login.html, account.html
* About: about our application. Page: about.html

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
