

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

function createNewEvent() {
    (async () => {
        var summary = "Routine";
        var desc = "Description";
        var start = "+00:00";
        var end = "+00:00";
        var calId = "umass.edu_l664sq5n14rf9g0gbt6rr3sdj8@group.calendar.google.com";

        var event = {
            'summary': summary,
            'location': loc,
            'description': desc,
            'start': { 'dateTime': start },
            'end': { 'dateTime': end }
        };

        const resp = await postData(newURL, event);
        const j = await resp.json();
        console.log(j);

        // var request = gapi.client.calendar.events.insert({
        //     'calendarId' : calId,
        //     'resource' : event
        // });

        // request.execute(function (event) {
        //     appendPre('Event created: ' + event.htmlLink);
        // });
    })();
}

// var xhr = new XMLHttpRequest();
// xhr.open("POST", yourUrl, true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify({
//     value: value
// }));

function convert(icsMSG){
    window.open( "data:text/calendar;charset=utf8," + escape(icsMSG));
}

(async () => {
    var todayDate	= new Date();
    var msgData	= todayDate.toISOString();
    var startDate	= todayDate.toISOString();
    var endDate	= todayDate.toISOString();
    var title = "title";

    var icsMSG1 = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:https://www.google.com/\r\nBEGIN:VEVENT\r\nUID:https://www.google.com/\r\nDTSTAMP:" + msgData + "Z\r\nDTSTART:" + startDate + "\r\n";

    var icsMSG2 = '';
    if(endDate != '') {
        icsMSG2 = "DTEND:" + endDate +"\r\n";
    }

    icsMSG3 = "SUMMARY:" + title + "\r\nEND:VEVENT\r\nEND:VCALENDAR";

    icsMSG = icsMSG1 + icsMSG2 + icsMSG3;
    console.log("icsMSG: ");
    console.log(icsMSG);

    var test = document.getElementById("test-ics");
    // button.addEventListener("click", convert(icsMSG));
    var node = document.createElement("a");
    node.setAttribute("id", "test-ics");
    node.onclick = function create() {
        window.open( "data:text/calendar;charset=utf8," + escape(icsMSG));
    }
    node.innerHTML = "Add to Calendar";
    test.appendChild(node);

    // console.log(button);
    // button.setAttribute('onClick', convert(icsMSG));
    // console.log(button);
})();

