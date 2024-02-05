function addTimer(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    cell1.setAttribute("colspan", 2);
    cell1.setAttribute("style", "text-align: center;");
    cell1.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    cell1.innerHTML = name;
    if (data.hasOwnProperty('tooltip')) {
        cell1.setAttribute("title", data.tooltip);
    }

    idx += 1
    row = table.insertRow(idx);
    cell = row.insertCell(0);
    cell.setAttribute("colspan", 2);
    cell.setAttribute("style", "text-align: center;");

    if (data.type == 'cycle') {
        var ct = document.createElement('input');
        ct.setAttribute("type", "hidden");
        ct.setAttribute("id", "cycletime_" + data.code);
        if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
            ct.setAttribute("name", data.gsCol);
        } else {
            ct.setAttribute("name", data.code);
        }
        ct.setAttribute("value", "[]");
        cell.appendChild(ct);
        ct = document.createElement('input');
        ct.setAttribute("type", "text");
        ct.setAttribute("id", "display_" + data.code);
        ct.setAttribute("width", "400px");
        ct.setAttribute("value", "");
        ct.setAttribute("disabled", "");
        cell.appendChild(ct);
        var lineBreak = document.createElement("br");
        cell.appendChild(lineBreak);
    }
    var button1 = document.createElement("input");
    button1.setAttribute("id", "start_" + data.code);
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "timer(this.parentElement)");
    button1.setAttribute("value", "Start");

    if (data.hasOwnProperty('autoStart')) {
        if (data.autoStart == "true") {
            button1.setAttribute("onload", "timer(this.parentElement)");
            button1.addEventListener('DOMContentLoaded', function () {
                alert("Ready!");
            }, false);
        }
    }
    cell.appendChild(button1);

    var inp = document.createElement("input");
    if (data.type == 'timer') {
        inp.classList.add("timer");
    } else {
        inp.classList.add("cycle");
    }
    inp.setAttribute("id", "input_" + data.code);
    inp.setAttribute("type", "text");
    if (data.type != 'cycle') {
        if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
            inp.setAttribute("name", data.gsCol);
        } else {
            inp.setAttribute("name", data.code);
        }
    }
    inp.setAttribute("style", "background-color: black; color: white;border: none; text-align: center;");
    inp.setAttribute("disabled", "");
    inp.setAttribute("value", 0);
    inp.setAttribute("size", 7);
    inp.setAttribute("maxLength", 7);
    cell.appendChild(inp);

    var button2 = document.createElement("input");
    button2.setAttribute("id", "clear_" + data.code);
    button2.setAttribute("type", "button");
    button2.setAttribute("onclick", "resetTimer(this.parentElement)");
    button2.setAttribute("value", "Reset");
    cell.appendChild(button2);
    var lineBreak = document.createElement("br");
    cell.appendChild(lineBreak);

    var button1force = document.createElement("input");
    button1force.setAttribute("id", "startForce_" + data.code);
    button1force.setAttribute("type", "button");
    button1force.setAttribute("onclick", "timerForceStart(this.parentElement)");
    button1force.setAttribute("value", "Start Force");
    button1force.style.visibility = "hidden";
    cell.appendChild(button1force);

    let showControls = true;
    if (data.hasOwnProperty('hideControls')) {
        if (data.hideControls.toLowerCase() == 'true') {
            showControls = false;
        }
    }
    if (data.type == 'cycle') {
        var button3 = document.createElement("input");
        button3.setAttribute("id", "cycle_" + data.code);
        button3.setAttribute("type", "button");
        button3.setAttribute("onclick", "newCycle(this.parentElement)");
        button3.setAttribute("value", "New Cycle");
        if (!showControls) {
            button3.style.visibility = "hidden";
        }
        cell.appendChild(button3);
        var button4 = document.createElement("input");
        button4.setAttribute("id", "undo_" + data.code);
        button4.setAttribute("type", "button");
        button4.setAttribute("onclick", "undoCycle(this.parentElement)");
        button4.setAttribute("value", "Undo");
        button4.setAttribute('style', "margin-left: 20px;");
        if (!showControls) {
            button4.style.visibility = "hidden";
        }
        cell.appendChild(button4);
    }

    idx += 1
    row = table.insertRow(idx);
    row.setAttribute("style", "display:none");
    cell = row.insertCell(0);
    cell.setAttribute("colspan", 2);
    cell.setAttribute("style", "text-align: center;");
    var inp = document.createElement('input');
    inp.setAttribute("type", "hidden");
    inp.setAttribute("id", "status_" + data.code);
    inp.setAttribute("value", "stopped");
    cell.appendChild(inp);
    inp = document.createElement('input');
    inp.setAttribute("hidden", "");
    inp.setAttribute("id", "intervalId_" + data.code);
    inp.setAttribute("value", "");
    cell.appendChild(inp);

    if (data.hasOwnProperty('defaultValue')) {
        var def = document.createElement("input");
        def.setAttribute("id", "default_" + data.code)
        def.setAttribute("type", "hidden");
        def.setAttribute("value", data.defaultValue);
        cell2.appendChild(def);
    }


    return idx + 1;
}

function addCounter(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    cell1.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    var cell2 = row.insertCell(1);
    cell1.innerHTML = name + '&nbsp;';
    if (data.hasOwnProperty('tooltip')) {
        cell1.setAttribute("title", data.tooltip);
    }
    cell2.classList.add("field");

    var button1 = document.createElement("input");
    button1.setAttribute("type", "button");
    button1.setAttribute("id", "minus_" + data.code);
    button1.setAttribute("onclick", "counter(this.parentElement, -1)");
    button1.setAttribute("value", "-");
    cell2.appendChild(button1);

    var inp = document.createElement("input");
    inp.classList.add("counter");
    inp.setAttribute("id", "input_" + data.code);
    inp.setAttribute("type", "text");
    if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
        inp.setAttribute("name", data.gsCol);
    } else {
        inp.setAttribute("name", data.code);
    }
    inp.setAttribute("style", "background-color: black; color: white;border: none; text-align: center;");
    inp.setAttribute("disabled", "");
    inp.setAttribute("value", 0);
    inp.setAttribute("size", 2);
    inp.setAttribute("maxLength", 2);
    cell2.appendChild(inp);

    var button2 = document.createElement("input");
    button2.setAttribute("type", "button");
    button2.setAttribute("id", "plus_" + data.code);
    button2.setAttribute("onclick", "counter(this.parentElement, 1)");
    button2.setAttribute("value", "+");
    cell2.appendChild(button2);

    if (data.hasOwnProperty('cycleTimer')) {
        if (data.cycleTimer != "") {
            inp = document.createElement('input');
            inp.setAttribute("hidden", "");
            inp.setAttribute("id", "cycleTimer_" + data.code);
            inp.setAttribute("value", data.cycleTimer);
            cell.appendChild(inp);
        }
    }

    if (data.hasOwnProperty('defaultValue')) {
        var def = document.createElement("input");
        def.setAttribute("id", "default_" + data.code)
        def.setAttribute("type", "hidden");
        def.setAttribute("value", data.defaultValue);
        cell2.appendChild(def);
    }

    return idx + 1;
}

function addClickableImage(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell = row.insertCell(0);
    cell.setAttribute("colspan", 2);
    cell.setAttribute("style", "text-align: center;");
    cell.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    cell.innerHTML = name;
    if (data.hasOwnProperty('tooltip')) {
        cell.setAttribute("title", data.tooltip);
    }

    let showFlip = true;
    if (data.hasOwnProperty('showFlip')) {
        if (data.showFlip.toLowerCase() == 'false') {
            showFlip = false;
        }
    }

    let showUndo = true;
    if (data.hasOwnProperty('showUndo')) {
        if (data.showUndo.toLowerCase() == 'false') {
            showUndo = false;
        }
    }

    if (showFlip || showUndo) {
        idx += 1
        row = table.insertRow(idx);
        cell = row.insertCell(0);
        cell.setAttribute("colspan", 2);
        cell.setAttribute("style", "text-align: center;");

        if (showUndo) {
            // Undo button
            let undoButton = document.createElement("input");
            undoButton.setAttribute("type", "button");
            undoButton.setAttribute("onclick", "undo(this.parentElement, event)");
            undoButton.setAttribute("value", "Undo");
            undoButton.setAttribute("id", "undo_" + data.code);
            undoButton.setAttribute("class", "undoButton");
            cell.appendChild(undoButton);
        }

        if (showFlip) {
            // Flip button
            let flipButton = document.createElement("input");
            flipButton.setAttribute("type", "button");
            flipButton.setAttribute("onclick", "flip(this.parentElement)");
            flipButton.setAttribute("value", "Flip Image");
            flipButton.setAttribute("id", "flip_" + data.code);
            flipButton.setAttribute("class", "flipButton");
            if (showUndo) {
                flipButton.setAttribute("margin-left", '8px');
            }
            cell.appendChild(flipButton);
        }
    }

    idx += 1;
    row = table.insertRow(idx);
    cell = row.insertCell(0);
    cell.setAttribute("colspan", 2);
    cell.setAttribute("style", "text-align: center;");
    var canvas = document.createElement('canvas');
    if (data.hasOwnProperty('width') && data.width != "") {
        if (data.width == "full") {
            canvas.width = Math.min((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * .95, 1000);
        } else {
            canvas.width = data.width;
        }
    } else {
        canvas.width *= 1.5;
    }
    if (data.hasOwnProperty('height') && data.height != "") {
        canvas.height = data.height;
    } else {
        const img = new Image();

        // get the image
        img.src = data.filename;

        // get height and width
        img.onload = function () {
            canvas.height = canvas.width / this.width * this.height;
        }
    }
    canvas.setAttribute("onclick", "onFieldClick(event)");
    canvas.setAttribute("class", "field-image-src");
    canvas.setAttribute("id", "canvas_" + data.code);
    canvas.innerHTML = "No canvas support";
    cell.appendChild(canvas);

    idx += 1;
    row = table.insertRow(idx);
    row.setAttribute("style", "display:none");
    cell = row.insertCell(0);
    cell.setAttribute("colspan", 2);
    var inp = document.createElement('input');
    inp.setAttribute("type", "hidden");
    inp.setAttribute("id", "XY_" + data.code);
    inp.setAttribute("value", "[]");
    cell.appendChild(inp);
    inp = document.createElement('input');
    inp.setAttribute("hidden", "");
    if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
        inp.setAttribute("name", data.gsCol);
    } else {
        inp.setAttribute("name", data.code);
    }
    inp.setAttribute("id", "input_" + data.code);
    inp.setAttribute("value", "[]");
    inp.setAttribute("class", "clickableImage");

    cell.appendChild(inp);

    // TODO: Make these more efficient/elegant
    inp = document.createElement('input');
    inp.setAttribute("hidden", "");
    inp.setAttribute("id", "clickRestriction_" + data.code);
    inp.setAttribute("value", "none");
    if (data.hasOwnProperty('clickRestriction')) {
        if ((data.clickRestriction == "one") ||
            (data.clickRestriction == "onePerBox")) {
            inp.setAttribute("value", data.clickRestriction);
        }
    }
    cell.appendChild(inp);

    inp = document.createElement('input');
    inp.setAttribute("hidden", "");
    inp.setAttribute("id", "allowableResponses_" + data.code);
    inp.setAttribute("value", "none");
    if (data.hasOwnProperty('allowableResponses')) {
        let responses = data.allowableResponses.split(' ').map(Number)
        console.log(responses)
        inp.setAttribute("value", responses);
    }
    cell.appendChild(inp);

    inp = document.createElement('input');
    inp.setAttribute("hidden", "");
    inp.setAttribute("id", "dimensions_" + data.code);
    inp.setAttribute("value", "12 6");
    if (data.hasOwnProperty('dimensions')) {
        if (data.dimensions != "") {
            // TODO: Add validation for "X Y" format
            inp.setAttribute("value", data.dimensions);
        }
    }
    cell.appendChild(inp);

    inp = document.createElement('input');
    inp.setAttribute("hidden", "");
    inp.setAttribute("id", "shape_" + data.code);
    // Default shape: white circle of size 5 not filled in
    inp.setAttribute("value", "circle 5 white white true");
    if (data.hasOwnProperty('shape')) {
        if (data.shape != "") {
            // TODO: Add validation for "shape size color fill" format
            inp.setAttribute("value", data.shape);
        }
    }
    cell.appendChild(inp);

    inp = document.createElement('input');
    inp.setAttribute("hidden", "");
    inp.setAttribute("id", "toggleClick_" + data.code);
    inp.setAttribute("value", "false");
    if (data.hasOwnProperty('toggleClick')) {
        if (data.toggleClick != "") {
            // TODO: Add validation for true/false format
            inp.setAttribute("value", data.toggleClick);
        }
    }
    cell.appendChild(inp);

    if (data.hasOwnProperty('cycleTimer')) {
        if (data.cycleTimer != "") {
            inp = document.createElement('input');
            inp.setAttribute("hidden", "");
            inp.setAttribute("id", "cycleTimer_" + data.code);
            inp.setAttribute("value", data.cycleTimer);
            cell.appendChild(inp);
        }
    }

    idx += 1
    row = table.insertRow(idx);
    row.setAttribute("style", "display:none");
    cell = row.insertCell(0);
    cell.setAttribute("colspan", 2);
    var img = document.createElement('img');
    img.src = data.filename;
    img.setAttribute("id", "img_" + data.code);
    img.setAttribute("class", "field-image-src");
    img.setAttribute("onload", "drawFields()");
    img.setAttribute("hidden", "");
    cell.appendChild(img);

    return idx + 1
}

function addText(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    cell1.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    var cell2 = row.insertCell(1);
    cell1.innerHTML = name + '&nbsp;';
    if (data.hasOwnProperty('tooltip')) {
        cell1.setAttribute("title", data.tooltip);
    }
    cell2.classList.add("field");
    var inp = document.createElement("input");
    inp.setAttribute("id", "input_" + data.code);
    inp.setAttribute("type", "text");
    if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
        inp.setAttribute("name", data.gsCol);
    } else {
        inp.setAttribute("name", data.code);
    }
    if (data.hasOwnProperty('size')) {
        inp.setAttribute("size", data.size);
    }
    if (data.hasOwnProperty('maxSize')) {
        inp.setAttribute("maxLength", data.maxSize);
    }
    if (data.hasOwnProperty('defaultValue')) {
        if (data.type == 'event') {
            data.defaultValue = data.defaultValue.toLowerCase();
        }
        inp.setAttribute("value", data.defaultValue);
    }
    if (data.hasOwnProperty('required')) {
        inp.setAttribute("required", "");
    }
    if (data.hasOwnProperty('disabled')) {
        inp.setAttribute("disabled", "");
    }
    cell2.appendChild(inp);

    if (data.hasOwnProperty('defaultValue')) {
        var def = document.createElement("input");
        def.setAttribute("id", "default_" + data.code)
        def.setAttribute("type", "hidden");
        def.setAttribute("value", data.defaultValue);
        cell2.appendChild(def);
    }

    return idx + 1
}

function addTextArea(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    cell1.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    var cell2 = row.insertCell(1);
    cell1.innerHTML = name + '&nbsp;';
    if (data.hasOwnProperty('tooltip')) {
        cell1.setAttribute("title", data.tooltip);
    }
    cell2.classList.add("field");
    var inp = document.createElement("textarea");
    inp.setAttribute("id", "input_" + data.code);
    inp.setAttribute("type", "text");
    inp.setAttribute("style", "resize: none;");
    if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
        inp.setAttribute("name", data.gsCol);
    } else {
        inp.setAttribute("name", data.code);
    }
    if (data.hasOwnProperty('cols')) {
        inp.setAttribute("cols", data.cols);
    }
    if (data.hasOwnProperty('rows')) {
        inp.setAttribute("rows", data.rows);
    }
    if (data.hasOwnProperty('maxSize')) {
        inp.setAttribute("maxLength", data.maxSize);
    }
    if (data.hasOwnProperty('defaultValue')) {
        if (data.type == 'event') {
            data.defaultValue = data.defaultValue.toLowerCase();
        }
        inp.setAttribute("value", data.defaultValue);
    }
    if (data.hasOwnProperty('required')) {
        inp.setAttribute("required", "");
    }
    if (data.hasOwnProperty('disabled')) {
        inp.setAttribute("disabled", "");
    }
    cell2.appendChild(inp);

    if (data.hasOwnProperty('defaultValue')) {
        var def = document.createElement("input");
        def.setAttribute("id", "default_" + data.code)
        def.setAttribute("type", "hidden");
        def.setAttribute("value", data.defaultValue);
        cell2.appendChild(def);
    }

    return idx + 1
}

function addNumber(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    cell1.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    var cell2 = row.insertCell(1);
    cell1.innerHTML = name + '&nbsp;';
    if (data.hasOwnProperty('tooltip')) {
        cell1.setAttribute("title", data.tooltip);
    }
    cell2.classList.add("field");
    var inp = document.createElement("input");
    inp.setAttribute("id", "input_" + data.code);
    inp.setAttribute("type", "number");
    if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
        inp.setAttribute("name", data.gsCol);
    } else {
        inp.setAttribute("name", data.code);
    }
    if ((data.type == 'team') ||
        (data.type == 'match')) {
        inp.setAttribute("onchange", "updateMatchStart(event)");
    }
    if (data.hasOwnProperty('min')) {
        inp.setAttribute("min", data.min);
    }
    if (data.hasOwnProperty('max')) {
        inp.setAttribute("max", data.max);
    }
    if (data.hasOwnProperty('defaultValue')) {
        inp.setAttribute("value", data.defaultValue);
    }
    if (data.hasOwnProperty('disabled')) {
        inp.setAttribute("disabled", "");
    }
    if (data.hasOwnProperty('required')) {
        inp.setAttribute("required", "");
    }
    cell2.appendChild(inp);

    if (data.hasOwnProperty('defaultValue')) {
        var def = document.createElement("input");
        def.setAttribute("id", "default_" + data.code)
        def.setAttribute("type", "hidden");
        def.setAttribute("value", data.defaultValue);
        cell2.appendChild(def);
    }

    if (data.type == 'team') {
        idx += 1
        row = table.insertRow(idx);
        cell1 = row.insertCell(0);
        cell1.setAttribute("id", "teamname-label");
        cell1.setAttribute("colspan", 2);
        cell1.setAttribute("style", "text-align: center;");
    }

    return idx + 1;
}

function addRadio(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    cell1.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    var cell2 = row.insertCell(1);
    cell1.innerHTML = name + '&nbsp;';
    if (data.hasOwnProperty('tooltip')) {
        cell1.setAttribute("title", data.tooltip);
    }
    cell2.classList.add("field");
    if ((data.type == 'level') ||
        (data.type == 'robot')
    ) {
        cell2.setAttribute("onchange", "updateMatchStart(event)");
    }
    var checked = null
    if (data.hasOwnProperty('defaultValue')) {
        checked = data.defaultValue;
    }
    if (data.hasOwnProperty('choices')) {
        keys = Object.keys(data.choices);
        keys.forEach(c => {
            var inp = document.createElement("input");
            inp.setAttribute("id", "input_" + data.code + "_" + c);
            inp.setAttribute("type", "radio");
            if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
                inp.setAttribute("name", data.gsCol);
            } else {
                inp.setAttribute("name", data.code);
            }
            inp.setAttribute("value", c);
            if (checked == c) {
                inp.setAttribute("checked", "");
            }
            cell2.appendChild(inp);
            cell2.innerHTML += "<label for=\"input_" + data.code + "_" + c + "\">" + data.choices[c] + "</label>";
        });
    }
    var inp = document.createElement("input");
    inp.setAttribute("id", "display_" + data.code);
    inp.setAttribute("hidden", "");
    inp.setAttribute("value", "");
    cell2.appendChild(inp);

    if (data.hasOwnProperty('defaultValue')) {
        var def = document.createElement("input");
        def.setAttribute("id", "default_" + data.code)
        def.setAttribute("type", "hidden");
        def.setAttribute("value", data.defaultValue);
        cell2.appendChild(def);
    }

    return idx + 1;
}

function addCheckbox(table, idx, name, data) {
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    cell1.classList.add("title");
    if (!data.hasOwnProperty('code')) {
        cell1.innerHTML = `Error: No code specified for ${name}`;
        return idx + 1;
    }
    var cell2 = row.insertCell(1);
    cell1.innerHTML = name + '&nbsp;';
    if (data.hasOwnProperty('tooltip')) {
        cell1.setAttribute("title", data.tooltip);
    }
    cell2.classList.add("field");
    var inp = document.createElement("input");
    inp.setAttribute("id", "input_" + data.code);
    inp.setAttribute("type", "checkbox");
    if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
        inp.setAttribute("name", data.gsCol);
    } else {
        inp.setAttribute("name", data.code);
    }
    cell2.appendChild(inp);

    if (data.type == 'bool') {
        cell2.innerHTML += "<label for=\"input_" + data.code + "\">" + "(checked = Yes)" + "</label>";
    }

    if (data.hasOwnProperty('defaultValue')) {
        var def = document.createElement("input");
        def.setAttribute("id", "default_" + data.code)
        def.setAttribute("type", "hidden");
        def.setAttribute("value", data.defaultValue);
        cell2.appendChild(def);
    }

    return idx + 1;
}

function addElement(table, idx, data) {
    var type = null;
    var name = 'Default Name';

    if (data.hasOwnProperty('name')) {
        name = data.name
    }

    if (data.hasOwnProperty('type')) {
        type = data.type
    } else {
        console.log("No type specified");
        console.log("Data: ")
        console.log(data);
        err = {
            code: "err",
            defaultValue: "No type specified: " + data
        };
        idx = addText(table, idx, name, err);
        return
    }
    if (type == 'counter') {
        idx = addCounter(table, idx, name, data);
    } else if ((data.type == 'scouter') || (data.type == 'event') || (data.type == 'text')) {
        idx = addText(table, idx, name, data);
    } else if (data.type == 'text_area') {
        idx = addTextArea(table, idx, name, data);
    } else if ((data.type == 'level') || (data.type == 'radio') || (data.type == 'robot')) {
        idx = addRadio(table, idx, name, data);
    } else if ((data.type == 'match') || (data.type == 'team') || (data.type == 'number')) {
        idx = addNumber(table, idx, name, data);
    } else if ((data.type == 'field_image') || (data.type == 'clickable_image')) {
        idx = addClickableImage(table, idx, name, data);
    } else if ((data.type == 'bool') || (data.type == 'checkbox') || (data.type == 'pass_fail')) {
        idx = addCheckbox(table, idx, name, data);
    } else if (data.type == 'counter') {
        idx = addCounter(table, idx, name, data);
    } else if ((data.type == 'timer') || (data.type == 'cycle')) {
        idx = addTimer(table, idx, name, data);
    } else {
        console.log(`Unrecognized type: ${data.type}`);
    }
    return idx
}


/**
 * adds to the number in innerHTML of the value tag.
 *
 * @param {element} element the <div> tag element (parent to the value tag).
 * @param {number} step the amount to add to the value tag.
 */
function counter(element, step) {
    let target = event.target;
    let base = getIdBase(target.id);

    var ctr = element.getElementsByClassName("counter")[0];
    let cycleTimer = document.getElementById("cycleTimer" + base);
    var result = parseInt(ctr.value) + step;

    if (isNaN(result)) {
        result = 0;
    }

    if (result >= 0 || ctr.hasAttribute('data-negative')) {
        ctr.value = result;
    } else {
        ctr.value = 0;
    }

    // If associated with cycleTimer - send New Cycle EVENT
    if (step >= 0 && cycleTimer != null) {
        document.getElementById("cycle_" + cycleTimer.value).click();
    }
}