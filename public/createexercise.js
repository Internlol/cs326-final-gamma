//need set count variable to create unique id's
//actually we can probably just iterate through the list object

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

function exerciseCreate() {
    (async () => {
        let name = document.getElementById("name").value;
        let desc = document.getElementById("desc").value;
        const data = { 'name' : name, 'desc' : desc };
        const newURL = "/users/" + "exercises" + "/create";
        console.log("exerciseCreate: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        if (j['result'] !== 'error') {
            document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
        } else {
            document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
        }
        })();
}

function addSet() {
    var repCount = document.getElementById("repCount").value;
    var repCountText = ""
    if(repCount != "") {
        repCountText = "Reps: " + repCount + " ";
    }
    var setLength = document.getElementById("setLength").value;
    var setLengthText = ""
    if(setLength != "") {
        setLengthText = "Set Length: " + setLength + " ";
    }
    var restTime = document.getElementById("restTime").value;
    var restTimeText = ""
    if(restTime != "") {
        restTimeText = "Rest Time: " + restTime + " ";
    }
    var setText = repCountText + setLengthText + restTimeText;
    if(setText != "") {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(setText);
        node.appendChild(textnode);
        document.getElementById("set_list").appendChild(node);
    }
}

function removeSet() {
    var setList = document.getElementById("set_list");
    if (setList.hasChildNodes()) {
        setList.removeChild(setList.lastChild);
    }
}

document.getElementById("add_set").addEventListener("click", addSet);
document.getElementById("remove_set").addEventListener("click", removeSet);