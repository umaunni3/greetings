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
    var x = memer();
    if (x === 1) {
        document.getElementById('ooh').style.display = "block";
        document.getElementById('hai').innerHTML = "oh shit u did";
    }
    if (x > 12) {
        document.getElementById('ooh').innerHTML = "too much click !!";
    } else {
    document.getElementById('ooh').innerHTML = x;
    }
}