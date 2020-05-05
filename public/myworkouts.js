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
        let workout = document.getElementById(id).id;
        console.log(workout);
        const data = {'name': workout};
        const newURL = url + "/users/workouts/delete";
        console.log("counterDelete: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        console.log(j["name"]+" was "+j.result);	    
        })();

    var temp = document.getElementById("workout_list");
    temp.removeChild(document.getElementById(id));
}

function editItem(id) {
    (async () => {
        let workout = document.getElementById(id).id;
        // const data = {'name': exercise};
        // console.log(data);
        localStorage.setItem("name", workout);
        // console.log(localStorage);
        location.href = "editworkout.html";
        // window.location.replace("editexercise.html");
        // const newURL = url + "/users/exercises/edit";
        // console.log("edit: fetching " + newURL);
        // const resp = await postData(newURL, data);
        // const j = await resp.json();
        // console.log(j["name"]+" was "+j.result);  
    })();
}

// call read all function
(async () => {
    console.log("fetching all workouts from server");
    const data = {};
    const newURL = url + "/users" + "/workouts" + "/readAll";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    var lastid = 0;
    for(var i = 0; i < j.length; i++) {
        var node = document.createElement("LI");
        var deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "X");
        deleteButton.setAttribute("style", "float:right");
        deleteButton.setAttribute("class", "btn btn-danger")
        var editButton = document.createElement("input");
        editButton.setAttribute("type", "button");
        editButton.setAttribute("value", "Edit");
        editButton.setAttribute("style", "float:right");
        editButton.setAttribute("class", "btn btn-light")
        node.setAttribute("class", "list-group-item");
        var text = "";
        var temp = j[i];
        text += temp.name;
        deleteButton.setAttribute('id',text);
        deleteButton.setAttribute('onClick','deleteItem("'+text+'")');
        editButton.setAttribute('id',text);
        editButton.setAttribute('onClick','editItem("'+text+'")');
        node.setAttribute("id", text);
        node.innerText = text;
        node.appendChild(deleteButton);
        //node.appendChild(editButton);
        document.getElementById("workout_list").appendChild(node);
        lastid += 1;
    }
    console.log("read all workouts from server");
    // $("ul").on("click", "input", function(e) {
    //     e.preventDefault();
    //     $(this).parent().remove();
    // });
})();