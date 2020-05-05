//need set count variable to create unique id's
//actually we can probably just iterate through the list object
const url = "https://fast-tundra-84247.herokuapp.com";
let setArray = [];

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
        if(name == "") { return; }
        let desc = document.getElementById("desc").value;
        const setData = setArray;
        // console.log(setData);
        const data = { 'name' : name, 'desc' : desc, 'setData' : setData };
        // console.log(data);
        const newURL = url + "/users" + "/exercises" + "/update";
        console.log("exerciseCreate: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        console.log(j['name'] + " was " + j['result']);
        location.href = "myexercises.html";
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
    // creating new set
    if(setText != "" && document.getElementById("set_list").childElementCount < 10) {
        const setObj = { 'repCount' : repCount, 'setLength' : setLength, 'restTime' : restTime };
        setArray.push(setObj);
        var node = document.createElement("LI");
        node.setAttribute("class", "list-group-item");
        var textnode = document.createTextNode(setText);
        node.appendChild(textnode);
        document.getElementById("set_list").appendChild(node);
    }
}

function removeSet() {
    var setList = document.getElementById("set_list");
    // remove last set
    if (setList.hasChildNodes()) {
        setArray.pop();
        setList.removeChild(setList.lastChild);
    }
}

document.getElementById("add_set").addEventListener("click", addSet);
document.getElementById("remove_set").addEventListener("click", removeSet);
document.getElementById("create_exercise").addEventListener("click", exerciseCreate);

// call read function
(async () => {
    console.log("fetching one exercise from server");
    const editName = localStorage.getItem("name");
    const data = {name : editName};
    const newURL = url + "/users" + "/exercises" + "/readOne";
    const resp = await postData(newURL, data);
    localStorage.removeItem("name");
    const j = await resp.json();
    console.log(j);
    document.getElementById("name").value = j.name;
    document.getElementById("desc").innerText = j.desc;
    setArray = j.setData;
    for(var i = 0; i < setArray.length; i++) {
        // var tempRepCount = setArray[i].repCount;
        // var tempSetLength = setArray[i].setLength;
        // var tempRestTime = setArray[i].restTime;
        let repCountText = "";
        let setLengthText = "";
        let restTimeText = "";

        if(setArray[i].repCount != "") {
            repCountText = "Reps: " + setArray[i].repCount + " ";
        }
        if(setArray[i].setLength != "") {
            setLengthText = "Set Length: " + setArray[i].setLength + " ";
        }
        if(setArray[i].restTime != "") {
            restTimeText = "Rest Time: " + setArray[i].restTime + " ";
        }
        var setText = repCountText + setLengthText + restTimeText;
    
        var node = document.createElement("LI");
        node.setAttribute("class", "list-group-item");
        var textnode = document.createTextNode(setText);
        node.appendChild(textnode);
        document.getElementById("set_list").appendChild(node);
    }




    // console.log(j);
    // for(var i = 0; i < j.length; i++) {
    //     node.setAttribute("class", "list-group-item");
    //     var text = "";
    //     var temp = j[i];
    //     text += temp.name;
    // }
    // console.log(j);
})();
