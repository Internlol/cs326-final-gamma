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
