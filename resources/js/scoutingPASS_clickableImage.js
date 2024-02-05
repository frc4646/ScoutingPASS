
function undo(parent, event) {
    let undoID = parent.firstChild;
    //Getting rid of last value
    changingXY = document.getElementById("XY" + getIdBase(undoID.id));
    changingInput = document.getElementById("input" + getIdBase(undoID.id));
    var tempValue = Array.from(JSON.parse(changingXY.value));
    tempValue.pop();
    changingXY.value = JSON.stringify(tempValue);

    tempValue = Array.from(JSON.parse(changingInput.value));
    tempValue.pop();
    changingInput.value = JSON.stringify(tempValue);
    drawFields();
    
    let target = event.target;
    let base = getIdBase(target.id);
    let cycleTimer = document.getElementById("cycleTimer" + base);
    // If associated with cycleTimer - send New Cycle EVENT
    if (cycleTimer != null) {
        document.getElementById("undo_" + cycleTimer.value).click();
    }
}

function flip(event) {
    let flipID = event.firstChild;
    var flipImg = document.getElementById("canvas" + getIdBase(flipID.id));
    if (flipImg.style.transform == "") {
        flipImg.style.transform = 'rotate(180deg)';
    } else {
        flipImg.style.transform = '';
    }
    drawFields();
}

function drawFields(name) {
    var fields = document.querySelectorAll("[id*='canvas_']");

    for (f of fields) {
        code = f.id.substring(7);
        var img = document.getElementById("img_" + code);
        var shape = document.getElementById("shape_" + code);
        let shapeArr = shape.value.split(' ');
        var ctx = f.getContext("2d");
        ctx.clearRect(0, 0, f.width, f.height);
        ctx.drawImage(img, 0, 0, f.width, f.height);

        var xyStr = document.getElementById("XY_" + code).value
        if (JSON.stringify(xyStr).length > 2) {
            pts = Array.from(JSON.parse(xyStr))
            for (p of pts) {
                var coord = p.split(",")
                var centerX = coord[0];
                var centerY = coord[1];
                var radius = 5;
                ctx.beginPath();
                if (shapeArr[0].toLowerCase() == 'circle') {
                    ctx.arc(centerX, centerY, shapeArr[1], 0, 2 * Math.PI, false);
                } else {
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                }
                ctx.lineWidth = 2;
                if (shapeArr[2] != "") {
                    ctx.strokeStyle = shapeArr[2];
                } else {
                    ctx.strokeStyle = '#FFFFFF';
                }
                if (shapeArr[4].toLowerCase() == 'true') {
                    ctx.fillStyle = shapeArr[3];
                }
                ctx.stroke();
                if (shapeArr[4].toLowerCase() == 'true') {
                    ctx.fill();
                }
            }
        }
    }
}

function onFieldClick(event) {
    let target = event.target;
    let base = getIdBase(target.id);

    //Resolution height and width (e.g. 52x26)
    let resX = 12;
    let resY = 6;

    let dimensions = document.getElementById("dimensions" + base);
    if (dimensions.value != "") {
        let arr = dimensions.value.split(' ');
        resX = arr[0];
        resY = arr[1];
    }

    //Turns coordinates into a numeric box
    let box = ((Math.ceil(event.offsetY / target.height * resY) - 1) * resX) + Math.ceil(event.offsetX / target.width * resX);
    let coords = event.offsetX + "," + event.offsetY;

    let allowableResponses = document.getElementById("allowableResponses" + base).value;

    if (allowableResponses != "none") {
        allowableResponsesList = allowableResponses.split(',').map(Number);
        if (allowableResponsesList.indexOf(box) == -1) {
            return;
        }
    }

    //Cumulating values
    let changingXY = document.getElementById("XY" + base);
    let changingInput = document.getElementById("input" + base);
    let clickRestriction = document.getElementById("clickRestriction" + base).value;
    let toggleClick = document.getElementById("toggleClick" + base).value;
    let cycleTimer = document.getElementById("cycleTimer" + base);
    let boxArr = Array.from(JSON.parse(changingInput.value));
    let xyArr = Array.from(JSON.parse(changingXY.value));

    if ((toggleClick.toLowerCase() == 'true') &&
        (boxArr.includes(box))) {
        // Remove it
        let idx = boxArr.indexOf(box);
        boxArr.splice(idx, 1);
        xyArr.splice(idx, 1);
        changingInput.value = JSON.stringify(boxArr);
        changingXY.value = JSON.stringify(xyArr);
    } else {
        if (JSON.stringify(changingXY.value).length <= 2) {
            changingXY.value = JSON.stringify([coords]);
            changingInput.value = JSON.stringify([box]);
        } else if (clickRestriction == "one") {
            // Replace box and coords
            changingXY.value = JSON.stringify([coords]);
            changingInput.value = JSON.stringify([box]);
        } else if (clickRestriction == "onePerBox") {
            // Add if box already not in box list/Array
            if (!boxArr.includes(box)) {
                boxArr.push(box);
                changingInput.value = JSON.stringify(boxArr);

                coords = findMiddleOfBox(box, target.width, target.height, resX, resY);
                xyArr.push(coords);
                changingXY.value = JSON.stringify(xyArr);
            }
        } else {
            // No restrictions - add to array
            xyArr.push(coords);
            changingXY.value = JSON.stringify(xyArr);

            boxArr.push(box);
            changingInput.value = JSON.stringify(boxArr);
        }
        // If associated with cycleTimer - send New Cycle EVENT
        if (cycleTimer != null) {
            
            document.getElementById("startForce_" + cycleTimer.value).click();
            document.getElementById("cycle_" + cycleTimer.value).click();
        }
    }

    drawFields()
}

function findMiddleOfBox(boxNum, width, height, resX, resY) {
    let boxHeight = height / resY;
    let boxWidth = width / resX;
    let boxX = (boxNum % resX) - 1;
    if (boxX == -1) {
        boxX = resX - 1
    }
    let boxY = Math.floor((boxNum - boxX + 1) / resX);
    let x = Math.round((boxWidth * boxX) + (Math.floor(boxWidth / 2)));
    let y = Math.round((boxHeight * boxY) + (Math.floor(boxHeight / 2)));
    return x + "," + y
}