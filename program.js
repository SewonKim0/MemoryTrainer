let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");

let startButton = document.getElementById("start-button");
let doc = document.getElementById("doc");
let lines = document.getElementById("lines");
let doneButton = document.getElementById("done-button");

let unresolved = new Object();

startButton.addEventListener("click", function(event) {
    step1.hidden = true;
    step2.hidden = false;

    let docText = doc.value;
    docText = docText.replaceAll("\t", "----");
    let entries = docText.split("\n");

    let idNum = 0;

    for (let entry of entries) {
        if (entry != "") {
            entry = entry.trim();
            unresolved["line" + idNum] = entry;
            idNum++;
        }
    }

    display();
});

doneButton.addEventListener("click", function(event) {    
    let removes = []
    for (let k of Object.keys(unresolved)) {
        let element = document.getElementById(k);
        if (element.className == "line") {
            removes.push(element.id);
        }
        element.remove();
    }

    for (let remove of removes) {
        delete unresolved[remove];
    }

    if (Object.keys(unresolved).length == 0) {
        step2.hidden = true;
        step3.hidden = false;
        return;
    }

    display();
});

function display() {
    for (let k of Object.keys(unresolved)) {
        let line = document.createElement("button");
        line.id = k;
        line.className = "line";

        if (unresolved[k].indexOf(" ") == -1) {
            line.innerText = unresolved[k];
        } else {
            line.innerText = unresolved[k].substring(0, unresolved[k].indexOf(" "));
        }

        line.addEventListener("click", function(event) {
            event.target.className = "unresolved";
            event.target.innerText = unresolved[event.target.id];
        });

        lines.appendChild(line);
    }
}

function objectToString(obj) {
    let returnData = "";
    for (let k of Object.keys(obj)) {
        returnData += "(" + k + " " + obj[k] + ")\n";
    }
    console.log(returnData);
    return returnData;
}