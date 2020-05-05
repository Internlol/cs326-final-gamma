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

function deleteItem(id) {
    // delete from database
    (async () => {
        let exercise = document.getElementById(id).id;
        // console.log(exercise);
        const data = {'name': exercise};
        const newURL = url + "/users/exercises/delete";
        // console.log("Delete: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        // console.log(j["name"]+" was "+j.result);	    
        })();

    var temp = document.getElementById("exercise_list");
    temp.removeChild(document.getElementById(id));
}

function editItem(id) {
    (async () => {
        let exercise = document.getElementById(id).id;
        localStorage.setItem("name", exercise);
        location.href = "editexercise.html";
    })();
}

// call read all function
(async () => {
    console.log("fetching all exercises from server");
    const data = {};
    const newURL = url + "/users" + "/exercises" + "/readAll";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    var lastid = 0;
    for(var i = 0; i < j.length; i++) {
        var node = document.createElement("LI");
        var deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "X");
        deleteButton.setAttribute("style", "float:right; margin-right:5px;");
        deleteButton.setAttribute("class", "btn btn-danger")
        var editButton = document.createElement("input");
        editButton.setAttribute("type", "button");
        editButton.setAttribute("value", "Edit");
        editButton.setAttribute("style", "float:right; margin-right:5px;");
        editButton.setAttribute("class", "btn btn-info");

        node.setAttribute("class", "list-group-item");
        var text = "";
        text += j[i].name;
        var viewButton = document.createElement("input");
        viewButton.setAttribute("type", "button");
        viewButton.setAttribute("value", "View");
        viewButton.setAttribute("style", "float:right; margin-right:5px;");
        viewButton.setAttribute("class", "btn btn-primary");
        let obj = j[i];

        viewButton.onclick = function view() {
            stuff = obj;
            console.log(stuff);
            var modal = document.getElementById("myModal");
            var table = document.createElement("tr");
            table.setAttribute("id", "modalTable");
            // table.setAttribute("style", "max-width: 50%;");
            let tName = document.createElement("td");
            tName.setAttribute("style", "max-width: 300px;");
            tName.innerText = stuff.name;
            let tDesc = document.createElement("td");
            tDesc.setAttribute("style", "max-width: 300px;");
            tDesc.innerText = stuff.desc;
            let setData = stuff.setData;
            table.appendChild(tName);
            table.appendChild(tDesc);
            let tSD = document.createElement("td");
            for(var i = 0; i < setData.length; i++) {
                let text = "";
                if (setData[i].repCount) {
                    text += "Reps: " + setData[i].repCount;
                }
                if (setData[i].setLength) {
                    text += " Length: " + setData[i].setLength;
                }
                if (setData[i].restTime) {
                    text += " Rest: " + setData[i].restTime + "";
                }
                p = document.createElement("p")
                p.innerText = JSON.stringify(text);
                tSD.appendChild(p);
            }
            tSD.setAttribute("style", "max-width: 300px;");
            table.appendChild(tSD);
            document.getElementById("modalText").appendChild(table);
            modal.style.display = "block";
        };
        deleteButton.setAttribute('id',text);
        deleteButton.setAttribute('onClick','deleteItem("'+text+'")');
        editButton.setAttribute('id',text);
        editButton.setAttribute('onClick','editItem("'+text+'")');
        node.setAttribute("id", text);
        node.innerText = text;
        node.appendChild(deleteButton);
        node.appendChild(editButton);
        node.appendChild(viewButton);
        document.getElementById("exercise_list").appendChild(node);
        lastid += 1;
    }
    console.log("read all exercises from server");
})();