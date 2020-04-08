# Team Gamma

## Fitness Schedule Builder

## Part 0: Data Interactions

On our application there are four types of data that a user can create and save: exercise, workout, routine, and calendar data. These data objects are only accessible when a user is logged in. Primarily users will be using the data objects (which have a defined hierarchy relationship) to organize their fitness schedule using exercises as the basic unit and building up to calendars at the highest layer of abstraction and specificity.

* Exercises: users will be able to create exercises which will be defined by name, description and sets (which consist of reps, duration and rest). Users will be able to save the exercises they have created to "My Exercises" and we plan to add viewing/editing functionality as well.
* Workouts: users will be able to create/save/view/edit workouts which will be defined by name, and a list of exercises (where order matters) that make up the workout.
* Routines: users will be able to create/save/view/edit routines which will be defined by name, and a data structure of workouts ordered by start time and end time. Routines represent a generic twenty four hour period in which a user can arrange their workouts with timing information.
* Calendars: users will be able to create/save/view/edit calendars. Users can add routines to the days of a calendar so that they can shedule a workout plan. The calendar will save the routine (and workouts that make up the routine) as events within the specified days. The user may be able to export calendar in .ics format or to Google Calendars for easy integration.

## Part 1: Wireframes & Part 2: HTML/CSS
We have broken up our application by pages so we will have wireframes side by side with the HTML/CSS we have created for this milestone.

### Pages

#### Sign In Page

Login pages are necessary.

![Login Page Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawLogin.PNG)

![Login Page Wireframe](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/Login.png)

#### Dashboard

Dashboard used to view a generic calender, which turns into a personalized one when a user logs in. This page serves as the starting point or home page of our application (from this page users will be able to access every other page)

![Dashboard Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawIndex.PNG)
![Dashboard HTML 1](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/index1.png)
![Dashboard HTML 2](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/index2.png)

The user can view their personal data by clicking on a given card.

#### My Calendars/My Routines/My Workouts/My Exercises

![My Calendars Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawMyCalenders.PNG)
![My Calendars HTML](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/mycalendars.png)

This is the generic view page for My Calendars/Routines/Workouts/Exercises. It will simply list all the content in order of most recently created. This is how users will access their stored data. Currently you can create a calendar or any other content by clicking button on top right corner. We will also add functionality where you can view/edit content as well.

#### Creating a Calendar

![View Calender Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawViewCalender.PNG)
![View Calendar HTML](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/createcalendar.png)

The user can create a calendar by selecting from created routines and assigning to days. This page will also provide a "day view" when clicking on a available routine (that gives overview of routine) or when clicking on calendar (this is not shown by our current HTML mockup)

#### Creating a Routine

![Create Routine Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawCreateRoutine.PNG)
![Create Routine HTML](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/createroutine.png)

When creating a routine users will be able to select start times and end times, and also view the overall routine in a "day view" that allows them to easily visualize their workout arrangements.

#### Creating a Workout

![Create Workout Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawCreateWorkout.PNG)
![Create Workout HTML](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/createworkout.png)

Creating an workout from available exercises. Users may be able to drag & drop exercises to current workout as well as rearrange the ordering of the current workout

#### Creating an Exercise

![Create Exercise Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawCreateExercise.PNG)
![Create Exercise HTML](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/createexercise.png)

Users will be able to add as many sets (specifying repetition, duration, rest) when Javascript interactivity is implemented.

#### Account Settings

Each user can edit their profile settings and email preferences on this page.

![Account Settings Drawing](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/drawSettings.PNG)

![Account Settings](https://github.com/Internlol/cs326-final-gamma/blob/master/docs/img/AccountSettings.png)

#### Breakdown of Labor

Aaron (internlol): dashboard/index, login page, about page, settings page, create calendar page, css file, wireframes, milestone1.md
Arnold (arnold-j): dashboard/index, create workout, myworkouts, create routine, my routines, wireframes, milestone1.md
Nadeem (nadeemfarhat): dashboard/index, wireframes, create exercise, myexercises, mycalendars, create routine, milestone1.md
We all collaborated in coming up with the wireframe outlines and we also collaboratively coded over screenshare, so we were all involved in all parts of milestone 1.
