let dt = new Date();

const getTime = (separator) => {
    let separateWith = separator == null ? ":" : separator;
    let dt = new Date();
    if (dt.getHours() > 0 && dt.getHours() < 10) {
        var hourNow = "0" + dt.getHours();
    } else if (dt.getHours() > 12) {
        var hourNow = dt.getHours() - 12;
        if (hourNow > 0 && hourNow < 10) {
            var hourNow = "0" + hourNow;
        }
    } else {
        var hourNow = "12";
    }

    let minuteNow = dt.getMinutes() >= 0 && dt.getMinutes() < 10 ? "0" + dt.getMinutes() : "" + dt.getMinutes();
    let noonNow = dt.getHours() < 12 ? "AM" : "PM";
    let getTime = hourNow + separateWith + minuteNow + " " + noonNow;
    return getTime;
};

let getMonth = dt.getMonth() < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
let getDate = getMonth + "<" + dt.getDate() + "<" + dt.getFullYear();
let currentRegEx = /\s*<\s*/;
const currentDate = getDate.split(currentRegEx);

let currentHour = getTime().substr(0, 2);
let currentMinute = getTime().substr(3, 2);
let currentNoon = getTime().substr(6, 2);
const currentTime = [currentHour, currentMinute, currentNoon];

let getFutureDate = document.querySelector("future > date").textContent;
let futureDay = getFutureDate.substr(0, 2);
let futureMonth = getFutureDate.substr(3, 2);
let futureYear = getFutureDate.substr(6, 4);
const futureDate = [futureDay, futureMonth, futureYear];

let getFutureTime = document.querySelector("future > time").textContent;
let futureHour = getFutureTime.substr(0, 2);
let futureMinute = getFutureTime.substr(3, 2);
let futureNoon = getFutureTime.substr(6, 2);
const futureTime = [futureHour, futureMinute, futureNoon];

let future = document.querySelector("future");
future.innerHTML = '';

//finding future days
if (futureDate[2] === currentDate[2]) {
    if (futureDate[0] === currentDate[0]) {
        if (futureDate[1] === currentDate[1]) {
            //finding future time
            if (futureTime[2] === currentTime[2]) {
                if (futureTime[0] === currentTime[0]) {
                    if (futureTime[1] < currentTime[1]) {
                        future.innerHTML = '';
                        //console.log("task finished");
                    }
                    else {
                        let findDiff = futureTime[1] - currentTime[1];
                        future.innerHTML = `${findDiff}M`;
                        //console.log(`${findDiff}M`)
                    }
                }
                else {
                    if (futureTime[0] < currentTime[0]) {
                        //console.log("task finished");
                    } else {
                        let findDiff = futureTime[0] - currentTime[0];
                        future.innerHTML = `${findDiff}H`;
                        //console.log(`${findDiff}H`);
                    }
                }
            }
            else {
                if (futureTime[2] == 'AM' && currentTime[2] == 'PM') {
                    //console.log("task finished");
                }
                else if (futureTime[2] == 'PM' && currentTime[2] == 'AM') {
                    let findDiff = (futureTime[2] - 12) + (currentTime[2] - 12);
                    future.innerHTML = `${findDiff}H`;
                    //console.log(findDiff);
                }
            }
        } else {
            if (futureDate[1] < currentDate[1]) {
                //console.log("task finished");
            } else {
                let findDiff = futureDate[1] - currentDate[1];
                future.innerHTML = (findDiff < 2) ? `${findDiff}Day` : `${findDiff}Days`;
                //console.log(`${findDiff}Days`);
            }
        }
    } else {
        if (futureDate[0] < currentDate[0]) {
            //console.log("task finished");
        } else {
            let findDiff = futureDate[0] - currentDate[0];
            future.innerHTML = (findDiff < 2) ? `${findDiff}Month` : `${findDiff}Months`;
            //console.log(`${findDiff}Months`);
        }
    }
} else {
    if (futureDate[2] < currentDate[2]) {
        //console.log("task finished");
    } else {
        let findDiff = futureDate[2] - currentDate[2];
        future.innerHTML = (findDiff < 2) ? `${findDiff}Year` : `${findDiff}Years`;
        //console.log(`${findDiff}Years`);
    }
}