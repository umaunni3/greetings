if (!document.cookie) {
    bakeCookie(null, null, "www.google.com");
}

// what to display when we don't know their name yet
var defaultNameText = "well you never told me actually";


// make a cookie with all the basic stuff (only default/required keys: expiration, path, domain)
function bakeCookie(expires, path, domain) {
    var cookie = "";
    if (expires) {
        // If it's a date
        if(expires instanceof Date) {
            // If it isn't a valid date
            if (isNaN(expires.getTime()))
                expires = new Date();
        }
    } 
    
    if (path) {
        cookie += "path=" + path + ";";
    }
    
    if (domain) {
        cookie += "domain=" + domain + ";";
    }
    
    document.cookie = cookie;
}

// add a key-val pair to the cookie. if it already exists in the cookie, update the value to the new provided value
function garnishCookie(key, value) {
    var cookie = document.cookie;
    var newPair = key + "=" + value;
    console.log("====");
    console.log(key + "=" + value);
    document.cookie = newPair;
}




// remove the specified key if it exists in the cookie; otherwise, take no action (but log to console)
function removeGarnish(key) {
    var cookie = document.cookie;
    if (!cookieContains(key)) {
        console.log("Cannot delete key '" + key + "' because it does not exist in the cookie.");
        return;
    } else {
        garnishCookie(key, ''); // we define a key with an empty string val to be not in the cookie
    }
}


//console.log("outer: " + document.cookie);
//garnishCookie("myName", "bob");
//console.log("updated1: " + document.cookie);
//garnishCookie("day", "saturday");
//console.log("updated2: " + document.cookie);
//garnishCookie("myName", "steve");
//console.log("updated3: " + document.cookie);


// given a key in the cookie, find the start and endpoints of the associated value if it exists and return the values in the format [startIndex, endIndex]; else return [-1, -1]
function findValueBounds(key) {
    if (!cookieContains(key)) {
        console.log("Cannot find bounds of key '" + key + "' because it does not exist in the cookie.");
        return [-1, -1];
    } else {
        var cookie = document.cookie;
        var keyIndex = cookie.search(key);
        var offsetLen = key.length;
        var startIndex = keyIndex + offsetLen + 1
        var endIndex = startIndex; // going to iterate till the end of the string, or till a new key-val pair starts; +1 in startIndex to account for = sign
        var currChar = cookie.charAt(endIndex);
        while (endIndex < cookie.length && currChar != ",") {
            endIndex += 1;
            currChar = cookie.charAt(endIndex);
        }
        
        return [startIndex, endIndex];
    }
}

// parse the document cookie to look for a key-value pair
function getCookieValue(key) {
    if (!cookieContains(key)) {
        // no such key found; return empty string
        console.log("Could not find key '" + key + "' in cookie.")
        return '';
    } else {
        var keysAndVals = readCookie();
        var keys = keysAndVals[0];
        var vals = keysAndVals[1];
        var keyIndex = keys.indexOf(key);
        return vals[keyIndex];
    }
}

// return true if the cookie contains the specified key and false otherwise
function cookieContains(key) {
    var keysAndVals = readCookie();
    var keys = keysAndVals[0];
    var vals = keysAndVals[1];
    var keyIndex = keys.indexOf(key);
    return keyIndex != -1 && vals[keyIndex] != '';
    // if the key has an empty string, say the cookie does not contain it; this is because actually deleting the key from the cookie is unexpectedly tricky
}


// return an array of the form [[keys], [values]] from the document cookie
function readCookie() {
    var cookie = document.cookie;
    if (!cookie) {
        // cookie has not been created yet; just return empty arrays
        return [[], []];
    }
    var pairings = cookie.split(";");
    
    var keys = [];
    var values = [];
    for (var i = 0; i < pairings.length; i++) {
//        console.log("-- " + i + pairings[i]);
//        console.log("-- " + i + pairings[i]);
        var key = pairings[i].split("=")[0].trim();
        var val = pairings[i].split("=")[1].trim();
        keys.push(key);
        values.push(val);
    }
    return [keys, values];
}

//console.log(readCookie());
//console.log("hai");
//console.log(getCookieValue("myName"));
//console.log(getCookieValue("doggo"));
////removeGarnish("myName");
//console.log(getCookieValue("myName"));


// 1st BUTTON CLICK STUFF! 
var timesClicked = 0;
function onClick1() {
    if (timesClicked == 0) {
        document.getElementById("demo").innerHTML = ":0";
    } else {
        var newFaceElem = document.createElement('p')
        var newFaceText = document.createTextNode(":0");
        newFaceElem.appendChild(newFaceText);
        document.getElementById("demo").appendChild(newFaceElem)
    }
    timesClicked += 1;
    
}

function addHTMLElement(mainElem, type, attributes, textContents) {
    var containingElem = document.createElement(type);
    // expect attributes to be an array of the form [[attribute names], [attribute values]]
    if (attributes) {
        var attribNames = attributes[0];
        var attribValues = attributes[1];
        for (var i = 0; i < attribNames.length; i++) {
            containingElem.setAttribute(attribNames[i], attribValues[i]);
        }
    }
    
    if (textContents) {
        var textContained = document.createTextNode(textContents);
        containingElem.appendChild(textContained);
    }
    mainElem.appendChild(containingElem);
//    console.log(containingElem.attributes);
}


// function to run if user has not visited before!
function newVisitor() {
    // ask the user to tell us who they are! store the name they give us so we can remember it next time.
    
    // just as a precaution, set the returning div to hidden
    console.log("alkdfjasl;dkfj");
    document.getElementById("returning").style.display = "none";
    
    // the div in which we will put all our stuff
    var mainDiv = document.getElementById("firstVisit");
    mainDiv.innerHTML = ""; // clear elements added previously
    mainDiv.setAttribute("class", "fade in");
    mainDiv.style.display = "block";
    console.log("aaaa");
   // if we *have* actually seen this user before (which we can determine from the timesVisited cookie attribute), alter the text to reflect this
    var firstTime = !cookieContains("timesVisited") || getCookieValue("timesVisited") == 0 // second condition should technically never be true bc we only set timesVisited after they've submitted their name, but just in case
    
    if (firstTime) {
        
        // add first line of text
        setTimeout(function() {console.log("hmm"); addHTMLElement(mainDiv, "h3", [["class"], ["fade in"]], "I don't believe we've met before...");}, 1000);
    } else {
        
        // add first line of text
        setTimeout(function() {console.log("hmmmmmmmm"); addHTMLElement(mainDiv, "h3", [["class"], ["fade in"]], "You seem familiar... I don't normally forget a face, but...");}, 1000);
    }


    // add a break
    setTimeout(function() {console.log("bbbbb"); addHTMLElement(mainDiv, "br", null, null);}, 1000);
    


    // make an <h2> element to tell the user to enter their name, and add this to the div
    setTimeout(function() {addHTMLElement(mainDiv, "h2", [["class"], ["fade in"]], "What's your name?");}, 4000);
    

    // now let's create a textbox to take in the user's name. should look like <input type="text" id="nameInputBox">
    setTimeout(function() {addHTMLElement(mainDiv, "input", [["type", "id", "class"], ["text", "nameInputBox", "fade in"]], null);}, 5000);


    // finally, we need to make a submit button so they can submit their name after they enter it
    setTimeout(function() {addHTMLElement(mainDiv, "input", [["type", "onclick", "value", "class"], ["button", "submitName()", "Submit", "fade in"]], null);}, 5000);
    

    
    
}

// handle name submission; add name to cookie so we can remember it next time the user visits. also hide the name entry element and greet the user using the name they provided.
function submitName() {
    // check the textbox for a name; if nothing entered, don't do anything
    var inputBox = document.getElementById("nameInputBox");
    if (inputBox) {
        var enteredText = inputBox.value;
//        enteredText = escape(enteredText);
        if (enteredText) {
            // store their name in the cookie
            garnishCookie("myName", enteredText);
            
            // keep track of how many times this user has visited the site
            if (cookieContains("timesVisited")) {
                var numVisits = parseInt(getCookieValue("timesVisited"));
                numVisits += 1;
            } else {
                var numVisits = 1; // first visit!
            }
            garnishCookie("timesVisited", numVisits);
            console.log(getCookieValue("timesVisited"));
            
            // hide the input field+submit button and greet them
            console.log("hola1");
            var mainDiv = document.getElementById("firstVisit");
            if (mainDiv) {
                // if mainDiv does exist (which it should), hide it and initialize the returningVisitor div, which should then be displayed.
                console.log("hola2");
                changeClass("firstVisit", "fade out");
                console.log("hola3");
                setTimeout(function() {mainDiv.style.display = "none"; console.log("hola4");}, 2000);
                
                setTimeout(function() {returningVisitor("newVisitor");}, 2200);
               
            }
            // if mainDiv doesn't exist... must be a bug/weird edge case, so just don't do anything
            
        }
        // if they didn't enter any text, just don't do anything
    }
    // if we didn't find an inputBox element, that's weird, but just don't do anything in that case
}

// initialize the html div and contents and stuff for layout to greet a returning visitor. srcPage is used to determine if page should display "Nice to meet you" (when srcPage is newVisitor) or "Welcome back" (when srcPage is onLoad).
function returningVisitor(srcPage) {
    // set the newVisitor div to hidden just in case
    document.getElementById("firstVisit").style.display = "none";
    // access the returning visitor div
    var mainDiv = document.getElementById("returning");
    // clear elements added previously
    mainDiv.innerHTML = "";
    
    // get user's name from the cookie!
    var name = getCookieValue("myName");
    if (name) {
        if (srcPage == "newVisitor") {
            var textToDisp = "Nice to meet you, ";
        } else if (srcPage == "onLoad") {
            var textToDisp = "Welcome back, ";
        }
        addHTMLElement(mainDiv, "h1", [["class"], ["fade in"]], textToDisp + name + "."); 
        changeClass("returning", "fade in");
        console.log("hola");
        // also add a button for if u wanna change your name
        addHTMLElement(mainDiv, "br", null, null);
        
        setTimeout(function() {console.log("whoa!"); addHTMLElement(mainDiv, "input", [["type", "onclick", "value", "class"], ["button", "setNewName()", "want to change your name?", "fade in"]], null);}, 2000);
        // set the returning visitor div to display
        mainDiv.style.display = "block";
    } else {
        // idk how this function even got called tbh but let's just call newVisitor() and get their name
        newVisitor();
    }
}

// function for button to click if you wanna change your name
function setNewName() {
    console.log("hai1");
    // assuming we're currently in the returning div
    var mainDiv = document.getElementById("returning");
    
    if (mainDiv) {
        // if mainDiv does exist (which it should), hide it and initialize the returningVisitor div, which should then be displayed.
        changeClass("returning", "fade out");
        setTimeout(function() {mainDiv.style.display = "none";}, 2000);
//        document.getElementById("firstVisit").setAttribute("class", "");
        console.log("hai2");
        setTimeout(function() {newVisitor();}, 2200);

    }
}

// specifically for changing class from fade-in to fade-out
function changeClass(id, newClass) {
    var elem = document.getElementById(id);
    if (elem) {
        if (!newClass) {
            var currClass = elem.getAttribute("class");
            if (currClass == "fade out") {
                newClass = "fade in";
            } else {
                newClass = "fade out";
            }    
        }
        
        elem.setAttribute("class", newClass);
    }
    
}

// after page has loaded, figure out whether we should be greeting the person or asking for their name
function onLoad() {
    // check if person has visited before and provided a name; if so, greet them. otherwise, show the name request screen.
    autoResizeDiv();
    if (cookieContains("myName")) {
        // welcome back screen
//        console.log(getCookieValue("myName"))
        returningVisitor("onLoad");
    } else {
//        console.log("havent met u before!")
        newVisitor();
    }
}

window.onload = onLoad;
function autoResizeDiv()
{
//    document.getElementById('sizing').style.height = window.innerHeight +'px';
    document.body.style.height = 0.7* (window.innerHeight +'px');
}
window.onresize = autoResizeDiv;
