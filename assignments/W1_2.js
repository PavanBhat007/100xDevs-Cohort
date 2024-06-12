/* Terminal Clock */
let h = 0;
let m = 0; 
let s = 0;

function incr() {
    if(s === 60) {
        s = 0;
        m++;
    } else s++;

    if(m === 60) {
        m = 0;
        h++;
    }
    
    console.log(h + ":" + m + ":" + s);
}

setInterval(incr, 1000);