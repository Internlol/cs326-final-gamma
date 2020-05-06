
const url = "https://fast-tundra-84247.herokuapp.com";
let availableExerciseArray = [];

async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}

function createWorkout() {
    (async () => {
        let name = document.getElementById("name").value;
        // check if name is empty, if empty do nothing
        if(name == "") { return; }
        currentWorkoutArray = []
        // iterate through list
        let currentWorkoutList = document.getElementById("current_workout").childNodes;
        for(let i = 0; i < currentWorkoutList.length; i++) {
            for(let j = 0; j < availableExerciseArray.length; j++) {
                tempExercise = availableExerciseArray[j];
                if(currentWorkoutList[i].innerText === tempExercise.name) {
                    currentWorkoutArray.push(tempExercise);
                    break;
                }
            }
        }
        // check if the array is empty, if empty do nothing
        if(currentWorkoutArray.length < 1) { return; }
        const data = { 'name': name, 'exerciseData': currentWorkoutArray };
        const newURL = "/users" + "/workouts" + "/create";
        console.log("workoutCreate: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        location.href = "myworkouts.html";
        })();
}

function removeExercise() {
    let currentWorkoutList = document.getElementById("current_workout");
    if (currentWorkoutList.hasChildNodes()) {
        currentWorkoutList.removeChild(currentWorkoutList.lastChild);
    }
}

document.getElementById("create_workout").addEventListener("click", createWorkout);
document.getElementById("remove_exercise").addEventListener("click", removeExercise);

(async () => {
    console.log("fetching all exercises from server");
    const data = {};
    const newURL = url + "/users" + "/exercises" + "/readAll";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    availableExerciseArray = j;
    var lastid = 0;
    for(var i = 0; i < j.length; i++) {
        var node = document.createElement("LI");
        node.setAttribute("class", "list-group-item");
        var text = "";
        var temp = j[i];
        text += temp.name;
        node.setAttribute("id", text);
        node.innerText = text;
        document.getElementById("exercise_list").appendChild(node);
        lastid += 1;
    }
    console.log("read all exercises from server");
})();