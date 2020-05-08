function selectItem(id){
    var temp = document.getElementById("selected_routine");
    temp.innerHTML=id;
}

(async () => {
    console.log("fetching all workouts from server");
    const data = {};
    const newURL = url + "/users" + "/routines" + "/readAll";
    const resp = await postData(newURL, data);
    const j = await resp.json();
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
        document.getElementById("available_routines").appendChild(node);
    }
    console.log("read all routines from server");
})();