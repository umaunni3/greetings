function clickCounter() {
    var clicks = 0;
    
    function clicker() {
        clicks = clicks + 1;
        console.log(clicks);
        return clicks;
    }
    return clicker;
}

var memer = clickCounter();
var colors = ["antiquewhite", "azure", "bisque", "#e6b3ff", "#ffe6cc", "#b3c6ff", "bisque", "#ccfff2", "#e6ffcc", "#ffcccc", "#fff0b3", "#ffe6f2", "#c6ecd9"];
var i = 0

function meme() {
    if (document.getElementById('hai').innerHTML === "i'm so r ry") {
        /* ok u r forgiven; reset counter */
        memer = clickCounter();
        document.getElementById('ooh').innerHTML = "ok i forgive u";
        document.getElementById('hai').innerHTML = 'click me u wont';
    }
    var x = memer();
    i = i + 1;
    document.body.style.backgroundColor = colors[i%(colors.length)];

    if (x === 1) {
        document.getElementById('ooh').style.display = "block";
        document.getElementById('hai').innerHTML = "oh shit u did";
    }
    if (x > 12) {
        document.getElementById('ooh').innerHTML = "too much click !!";
        document.getElementById('hai').innerHTML = "i'm so r ry";
    } else {
        // reset = false;
        document.getElementById('ooh').innerHTML = x;
    }
}

var reader = new FileReader();
//reader.readAsText('something.txt');
//console.log(reader.result);
var output = '';
reader.onload = function (e) {
    output = e.target.result;
    displayContents(output);
    
};
reader.readAsText('something.txt');

function displayContents(output_str) {
    console.log(output_str);
}