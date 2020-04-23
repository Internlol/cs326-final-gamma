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

// fetch data with post
// const data = {};
// const newURL = "/users/:userId" + "/exercise" + "/read";
// console.log("counterRead: fetching " + newURL);
// const resp = await postData(newURL, data);
// const j = await resp.json();





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