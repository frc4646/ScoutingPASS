function newCycle(event) {
    let timerID = event.firstChild;
    let base = getIdBase(timerID.id);
    let inp = document.getElementById("input" + base)
    let cycleTime = inp.value
    inp.value = 0

    if (cycleTime > 0) {
        let cycleInput = document.getElementById("cycletime" + base);
        var tempValue = Array.from(JSON.parse(cycleInput.value));
        tempValue.push(cycleTime);
        cycleInput.value = JSON.stringify(tempValue);
        let d = document.getElementById("display" + base);
        d.value = cycleInput.value.replace(/\"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
    }
}

function undoCycle(event) {
    let undoID = event.firstChild;
    let uId = getIdBase(undoID.id);
    //Getting rid of last value
    let cycleInput = document.getElementById("cycletime" + uId);
    var tempValue = Array.from(JSON.parse(cycleInput.value));
    tempValue.pop();
    cycleInput.value = JSON.stringify(tempValue);
    let d = document.getElementById("display" + uId);
    d.value = cycleInput.value.replace(/\"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
}

function resetTimer(event) {
    let timerID = event.firstChild;
    let tId = getIdBase(timerID.id);
    let inp = document.getElementById("input" + tId)
    inp.value = 0

    // stop timer
    timerStatus = document.getElementById("status" + tId);
    startButton = document.getElementById("start" + tId);
    intervalIdField = document.getElementById("intervalId" + tId);
    var intervalId = intervalIdField.value;
    timerStatus.value = 'stopped';
    startButton.setAttribute("value", "Start");
    if (intervalId != '') {
        clearInterval(intervalId);
    }
    intervalIdField.value = '';
}

function timer(event) {
    let timerID = event.firstChild;
    let tId = getIdBase(timerID.id)
    timerStatus = document.getElementById("status" + tId);
    startButton = document.getElementById("start" + tId);
    intervalIdField = document.getElementById("intervalId" + tId);
    var statusValue = timerStatus.value;
    var intervalId = intervalIdField.value;
    if (statusValue == 'stopped') {
        timerStatus.value = 'started';
        startButton.setAttribute("value", "Stop");

        var intId = setInterval(() => {
            if (document.getElementById("status" + tId).value == 'started') {
                inp = document.getElementById("input" + tId);
                var t = parseFloat(inp.value);
                t += 0.1;
                tTrunc = t.toFixed(1)
                inp.value = tTrunc;
            }
        }, 100);
        intervalIdField.value = intId;
    } else {
        timerStatus.value = 'stopped';
        startButton.setAttribute("value", "Start");

        clearInterval(intervalId);
        intervalIdField.value = '';
    }
    drawFields();
}