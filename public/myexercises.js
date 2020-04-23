const url = "http://localhost:8080";

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

// call read function
(async () => {
    console.log("fetching all exercises from server");
    const data = {};
    const newURL = url + "/users" + "/exercises" + "/read";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    for(var i = 0; i < j.length; i++) {
        var node = document.createElement("LI");
        node.setAttribute("class", "list-group-item");
        var text = "";
        var temp = j[i];
        text += temp.name;
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);
        document.getElementById("exercise_list").appendChild(node);
    }
    console.log(j);
})();