var timesClicked = 0;
function onClick() {
    if (timesClicked == 0) {
        document.getElementById("demo").innerHTML = ":0";
    } else {
        var newFaceElem = document.createElement("p")
        var newFaceText = document.createTextNode(":0");
        newFaceElem.appendChild(newFaceText);
        document.getElementById("demo").appendChild(newFaceElem)
    }
    timesClicked += 1;
    console.log(document.body)
    
}