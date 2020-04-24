
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

function createWorkout() {
    (async () => {
        let name = document.getElementById("name").value;
        var items = document.getElementsByClassName("curr"); // gets items under current workout
        if(name == "" || items.length == 0) { return; }
        exercises = [];
        for (let i = 0; i < items.length; i++) {
            exercises.push(items[i].innerHTML);
        }
        console.log(exercises)
        const data = { 'name' : name, 'workout' : JSON.stringify(exercises) };
        console.log(data);
        const newURL = "/users/" + "workouts" + "/create";
        console.log("exerciseCreate: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        // if (j['result'] !== 'error') {
        //     document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
        // } else {
        //     document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
        // }
        })();
}


document.getElementById("create_workout").addEventListener("click", createWorkout);

(async () => {
    console.log("fetching all exercises from server");
    const data = {};
    const newURL = url + "/users" + "/exercises" + "/read";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    for(var i = 0; i < j.length; i++) {
        var outside = document.createElement("tr");
        var inside = document.createElement("td");
        // console.log(outside);
        var text = "";
        var temp = j[i];
        text += temp.name;
        inside.innerText = text;
        outside.appendChild(inside);
        document.getElementById("exercise_list").appendChild(outside);
    }
    console.log(j);
})();