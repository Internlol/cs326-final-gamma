# Team Gamma
## Milestone 3

### Part 1: Database Implementation

For our app we will have a collection for each of the data types for a user (exercises, workouts, routines, calendars)

#### Exercises Collection Documentation

We have a collection called "exercises" dedicated to exercise data.

Exercise Document Structure:

{
  
  _id: <ObjectId1>,
  
  name: String // name of the exercise
  
  desc: String // exercise description
  
  setData:  Array // list of sets

}

an example of one possible exercise document:

{
  
  "_id":{"$oid":"5eadecc8b6fbfe46ce9f61d5"},
  
  "name":"pushups",
  
  "desc":"push yourself off the ground",
  
  "setData":[{"repCount":"12","setLength":"","restTime":"30 seconds"},{"repCount":"12","setLength":"","restTime":"30 seconds"},{"repCount":"12","setLength":"","restTime":"30 seconds"}]

}

#### Workouts Collection Documentation

We have a collection called "workouts" dedicated to workout data.

Workout Document Structure:

{
  
  _id: <ObjectId1>,
  
  name: String // name of the exercise
  
  setData:  Array // list of sets

}

an example of one possible workout document:

{

"_id":{"$oid":"5eb0e05db6fbfe46cef02890"},

"name":"example workout",

"exerciseData":[{"_id":"5eadecc8b6fbfe46ce9f61d5","name":"pushups","desc":"push yourself off the ground","setData":[{"repCount":"12","setLength":"","restTime":"30 seconds"},{"repCount":"12","setLength":"","restTime":"30 seconds"},{"repCount":"12","setLength":"","restTime":"30 seconds"}]},{"_id":"5eae2327b6fbfe46ceb734f3","name":"running","desc":"","setData":[{"repCount":"1","setLength":"30min","restTime":""}]}]

}

###  Breakdown of Labor:

Arnold: implemented createExercise in mongodb.ts, routes in server-routing.ts

Nadeem: implemented deleteExercise in mongodb.ts, front-end talking to server in myworkouts.js, createworkout.js 

Aaron: implemented getExercise, getAllExercise in mongodb.ts, front-end view buttons for myexercises.html/myexercises.js, workout CRUD operations in mongodb.ts 
