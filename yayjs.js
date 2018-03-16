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

function meme() {
    if (document.getElementById('hai').innerHTML === "i'm so r ry") {
        /* ok u r forgiven; reset counter */
        memer = clickCounter();
        document.getElementById('ooh').innerHTML = "ok i forgive u";
        document.getElementById('hai').innerHTML = 'click me u wont';
    }
    var x = memer();

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