function updateClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    hours = hours % 12;
    
    let hoursFrac = hours / 12;
    let minutesFrac = minutes / 60;
    let secondsFrac = seconds / 60;

    let root = document.querySelector(':root');
    
    let hAngle = (270 + hoursFrac * 360 + minutesFrac * 30 + secondsFrac * 0.5);
    let hxTrans = Math.cos(hAngle / 360 * 2 * Math.PI) - 1;
    let hyTrans = -1 * Math.sin(hAngle / 360 * 2 * Math.PI);
    
    let mAngle = (270 + minutesFrac * 360 + secondsFrac * 6);
    let mxTrans = Math.cos(mAngle / 360 * 2 * Math.PI) - 1;
    let myTrans = -1 * Math.sin(mAngle / 360 * 2 * Math.PI);
    
    root.style.setProperty('--h-angle', (hAngle + "deg"));
    root.style.setProperty('--h-x-trans', hxTrans);
    root.style.setProperty('--h-y-trans', hyTrans);
    
    root.style.setProperty('--m-angle', (mAngle + "deg"));
    root.style.setProperty('--m-x-trans', mxTrans);
    root.style.setProperty('--m-y-trans', myTrans);
}

updateClock();
var intervalID = setInterval(updateClock, 10);