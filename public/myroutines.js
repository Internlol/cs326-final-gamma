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
        let routine = document.getElementById(id).id;
        const data = {'name': routine};
        const newURL = url + "/users/routines/delete";
        console.log("counterDelete: fetching " + newURL);
        const resp = await postData(newURL, data);
        const j = await resp.json();
        console.log(j["name"]+" was "+j.result);	    
        })();

    var temp = document.getElementById("routine_list");
    temp.removeChild(document.getElementById(id));
}

function editItem(id) {
    (async () => {
        let routine = document.getElementById(id).id;
        // const data = {'name': exercise};
        // console.log(data);
        localStorage.setItem("name", routine);
        // console.log(localStorage);
        location.href = "createroutine.html";
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
    console.log("fetching all routines from server");
    const data = {};
    const newURL = url + "/users" + "/routines" + "/readAll";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    for(var i = 0; i < j.length; i++) {
        var node = document.createElement("LI");
        var deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "X");
        deleteButton.setAttribute("style", "float:right");
        deleteButton.setAttribute("class", "btn btn-danger")
        // var editButton = document.createElement("input");
        // editButton.setAttribute("type", "button");
        // editButton.setAttribute("value", "Edit");
        // editButton.setAttribute("style", "float:right");
        // editButton.setAttribute("class", "btn btn-light")
        node.setAttribute("class", "list-group-item");
        var text = "";
        var temp = j[i];
        text += temp.name;
        deleteButton.setAttribute('id',text);
        deleteButton.setAttribute('onClick','deleteItem("'+text+'")');
        // editButton.setAttribute('id',text);
        // editButton.setAttribute('onClick','editItem("'+text+'")');
        node.setAttribute("id", text);
        node.innerText = text;
        node.appendChild(deleteButton);
        //node.appendChild(editButton);
        document.getElementById("routine_list").appendChild(node);
    }
    console.log("read all routines from server");
    // $("ul").on("click", "input", function(e) {
    //     e.preventDefault();
    //     $(this).parent().remove();
    // });
})();