let workoutArray = [];

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
    if(workout_name != "" && start_time!="" && end_time != ""){
        let workoutObj = {"workout": workout_name, "start": start_time, "end": end_time};
        workoutArray.push(workoutObj);
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
    timetable.addLocations([name, "Gym", "Hiking Trail", "Home"]);
    for(var i = 0; i < workoutArray.length; i++){
        let wobj = workoutArray[i];
        shr = parseInt(wobj.start.substr(0,2));
        smin = parseInt(wobj.start.substr(3,2));
        ehr = parseInt(wobj.end.substr(0,2));
        emin = parseInt(wobj.end.substr(3,2));
        timetable.addEvent(wobj.workout, name, new Date(0, 0, 0, shr, smin), new Date(0,0,0,ehr, emin));
    }
    //timetable.addEvent('Running', name, new Date(0,0,0,10,45), new Date(0,0,0,12,30));
    //timetable.addEvent('Run', name, new Date(0,0,0,11,45), new Date(0,0,0,12,30));
    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable'); // any css selector
}