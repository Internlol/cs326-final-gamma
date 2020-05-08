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

function addEvent() {
    (async () => {
        const newURL = "https://www.googleapis.com/calendar/v3/calendars/rp77f3ltpahkasbseu3vam9t9c@group.calendar.google.com/events";
        const data = { "summary": "test event", "end": { "dateTime": "2020-05-8T13:00:00-07:00" }, "start": { "dateTime": "2020-05-8T12:00:00-07:00" } };
        const resp = await postData(newURL, data);
        const j = await resp.json();
        console.log(j);
    })();
}

function selectItem(id) {
    var temp = document.getElementById("selected_routine");
    temp.innerHTML=id;
}

function cal1(id) {
    let source = "https://calendar.google.com/calendar/embed?src=rp77f3ltpahkasbseu3vam9t9c%40group.calendar.google.com&ctz=America%2FNew_York"
    document.getElementById("iframe").setAttribute("src", source);
}
function cal2(id) {
    let source = "https://calendar.google.com/calendar/embed?src=sd8a4kqcvfp0lophg151c8krqk%40group.calendar.google.com&ctz=America%2FNew_York"
    document.getElementById("iframe").setAttribute("src", source);
}
function cal3(id) {
    let source = "https://calendar.google.com/calendar/embed?src=hupbhqvst3i8d8ftgd029i9lds%40group.calendar.google.com&ctz=America%2FNew_York"
    document.getElementById("iframe").setAttribute("src", source);
}

document.getElementById("cal1").addEventListener("click", cal1);
document.getElementById("cal2").addEventListener("click", cal2);
document.getElementById("cal3").addEventListener("click", cal3);
// document.getElementById("add_event").addEventListener("click", addEvent);

(async () => {
    console.log("fetching all routines from server");
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