// load data from dababase
var arr = [{name: "pushups", desc: "some pushups", setData: "[{'repCount':'12','setLength':'','restTime':'30'}]"}, {name: "squats", desc: "some squats", setData: "[{'repCount':'12','setLength':'','restTime':'30'}]"}];
// get data

// parse json object
for(var i = 0; i < arr.length; i++) {
    var node = document.createElement("LI");
    node.setAttribute("class", "list-group-item");
    var text = "";
    var temp = arr[i];
    text += temp.name;
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("exercise_list").appendChild(node);
}
// iterate through json and create list items