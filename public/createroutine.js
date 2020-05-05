let workoutArray = [];
let availableWorkoutArray = [];

const url = "https://fast-tundra-84247.herokuapp.com";

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

function selectItem(id){
        var temp = document.getElementById("selected_workout");
        temp.innerHTML=id;
}

function removeWorkout(){
    let temp = document.getElementById("curr_routine");

    if(temp.hasChildNodes()){
        workoutArray.pop();
        temp.removeChild(temp.lastChild);
    }
}

function addWorkout(){
    let workout_name = document.getElementById("selected_workout").innerText;
    let start_time = document.getElementById("start_time").value;
    let end_time = document.getElementById("end_time").value;
    let workoutData = {}
    if(workout_name != "" && start_time!="" && end_time != ""){
        for(let i = 0; i < availableWorkoutArray.length; i++){
            if(workout_name === availableWorkoutArray[i].name){
                workoutData = availableWorkoutArray[i];
            }

        }
        let workoutObjTimed = {"workout": workoutData, "start": start_time, "end": end_time};
        console.log(workoutObjTimed);
        workoutArray.push(workoutObjTimed);
        let node = document.createElement("LI");
        node.setAttribute("class", "list-group-item")
        let text = workout_name+" start: "+start_time+" end: "+end_time;
        let textNode = document.createTextNode(text);
        node.appendChild(textNode);
        document.getElementById("curr_routine").appendChild(node);
    }
}

function renderTable(){
    var timetable = new Timetable();
    let start_scope = parseInt(document.getElementById("start_scope").value);
    let end_scope = parseInt(document.getElementById("end_scope").value);
    timetable.setScope(start_scope, end_scope);
    let name = document.getElementById("routine_name").value;
    timetable.addLocations([name]);
    for(var i = 0; i < workoutArray.length; i++){
        let wobj = workoutArray[i];
        shr = parseInt(wobj.start.substr(0,2));
        smin = parseInt(wobj.start.substr(3,2));
        ehr = parseInt(wobj.end.substr(0,2));
        emin = parseInt(wobj.end.substr(3,2));
        timetable.addEvent(wobj.workout.name, name, new Date(0, 0, 0, shr, smin), new Date(0,0,0,ehr, emin));
    }
    //timetable.addEvent('Running', name, new Date(0,0,0,10,45), new Date(0,0,0,12,30));
    //timetable.addEvent('Run', name, new Date(0,0,0,11,45), new Date(0,0,0,12,30));
    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable'); // any css selector
}

function createRoutine() {
    (async () => {
        let name = document.getElementById("routine_name").value;
        // check if name is empty, if empty do nothing
        if(name == "") { return; }

        // check if the array is empty, if empty do nothing
        if(workoutArray.length < 1) { return; }
        const data = { 'name': name, 'workoutData': workoutArray };
        const newURL = "/users" + "/routines" + "/create";
        console.log("routineCreate: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        location.href = "myroutines.html";
        })();
}

(async () => {
    console.log("fetching all exercises from server");
    const data = {};
    const newURL = url + "/users" + "/workouts" + "/readAll";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    availableWorkoutArray = j;
    for(var i = 0; i < j.length; i++) {
        var node = document.createElement("LI");
        node.setAttribute("class", "list-group-item");
        var text = "";
        var temp = j[i];
        text += temp.name;
        node.setAttribute("id", text);
        node.innerText = text;
        var selectButton = document.createElement("input");
        selectButton.setAttribute("type", "button");
        selectButton.setAttribute("value", "Select");
        selectButton.setAttribute("style", "float:right; margin-right:5px;");
        selectButton.setAttribute("class", "btn btn-light");
        selectButton.setAttribute('id',text);
        selectButton.setAttribute('onClick','selectItem("'+text+'")');
        node.appendChild(selectButton);
        document.getElementById("avail_workouts").appendChild(node);
    }
    console.log("read all exercises from server");
})();