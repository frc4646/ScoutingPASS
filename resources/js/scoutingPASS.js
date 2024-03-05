// ScoutingPASS.js
//
// The guts of the ScountingPASS application
// Written by Team 2451 - PWNAGE

var enableGoogleSheets = false;
var pitScouting = false;
var checkboxAs = 'TrueFalse';

// Options
var options = {
  correctLevel: QRCode.CorrectLevel.L,
  quietZone: 15,
  quietZoneColor: '#FFFFFF'
};

// Must be filled in: e=event, m=match#, l=level(q,qf,sf,f), t=team#, r=robot(r1,r2,b1..), s=scouter
//var requiredFields = ["e", "m", "l", "t", "r", "s", "as"];
var requiredFields = ["e", "m", "l", "r", "s", "as"];

function configure() {
  try {
    var mydata = JSON.parse(config_data);
  } catch (err) {
    console.log(`Error parsing configuration file`)
    console.log(err.message)
    console.log('Use a tool like http://jsonlint.com/ to help you debug your config file')
    var table = document.getElementById("prematch_table")
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = `Error parsing configuration file: ${err.message}<br><br>Use a tool like <a href="http://jsonlint.com/">http://jsonlint.com/</a> to help you debug your config file`
    return -1
  }

  if (mydata.hasOwnProperty('dataFormat')) {
    dataFormat = mydata.dataFormat;
  }

  if (mydata.hasOwnProperty('title')) {
    document.title = mydata.title;
  }

  if (mydata.hasOwnProperty('page_title')) {
    for (pgtitle of document.getElementsByClassName("page_title")) {
      pgtitle.innerHTML = mydata.page_title;
    }
  }

  if (mydata.hasOwnProperty('enable_google_sheets')) {
    if (mydata.enable_google_sheets.toUpperCase() == 'TRUE') {
      enableGoogleSheets = true;
    }
  }

  if (mydata.hasOwnProperty('pitConfig')) {
    if (mydata.pitConfig.toUpperCase() == 'TRUE') {
      pitScouting = true;
    }
  }

  if (mydata.hasOwnProperty('checkboxAs')) {
    // Supported modes
    // YN - Y or N
    // TF - T or F
    // 10 - 1 or 0
    if (['YN', 'TF', '10', 'TrueFalse'].includes(mydata.checkboxAs)) {
      console.log("Setting checkboxAs to " + mydata.checkboxAs);
      checkboxAs = mydata.checkboxAs;
    } else {
      console.log("unrecognized checkboxAs setting.  Defaulting to YN.")
      checkboxAs = 'YN';
    }
  }

  // Configure prematch screen
  var pmc = mydata.prematch;
  var pmt = document.getElementById("prematch_table");
  var idx = 0;
  pmc.forEach(element => {
    idx = addElement(pmt, idx, element);
  });

  // Configure auton screen
  var ac = mydata.auton;
  var at = document.getElementById("auton_table");
  idx = 0;
  ac.forEach(element => {
    idx = addElement(at, idx, element);
  });

  // Configure teleop screen
  var tc = mydata.teleop;
  var tt = document.getElementById("teleop_table");
  idx = 0;
  tc.forEach(element => {
    idx = addElement(tt, idx, element);
  });

  // Configure endgame screen
  var egc = mydata.endgame;
  var egt = document.getElementById("endgame_table");
  idx = 0;
  egc.forEach(element => {
    idx = addElement(egt, idx, element);
  });

  // Configure postmatch screen
  pmc = mydata.postmatch;
  pmt = document.getElementById("postmatch_table");
  var idx = 0;
  pmc.forEach(element => {
    idx = addElement(pmt, idx, element);
  });

  if (!enableGoogleSheets) {
    document.getElementById("submit").style.display = "none";
  }

  return 0
}

function getRobot() {
  return document.forms.scoutingForm.r.value;
}


function resetRobot() {
  for (rb of document.getElementsByName('r')) {
    rb.checked = false
  };
}


function getLevel() {
  return document.forms.scoutingForm.l.value
}


function validateData() {
  var ret = true;
  var errStr = "";
  for (rf of requiredFields) {
    var thisRF = document.forms.scoutingForm[rf];
    if (thisRF.value == "[]" || thisRF.value.length == 0) {
      if (rf == "as") {
        rftitle = "Auto Start Position"
      } else {
        thisInputEl = thisRF instanceof RadioNodeList ? thisRF[0] : thisRF;
        rftitle = thisInputEl.parentElement.parentElement.children[0].innerHTML.replace("&nbsp;", "");
      }
      errStr += rf + ": " + rftitle + "\n";
      ret = false;
    }
  }
  if (ret == false) {
    alert("Enter all required values\n" + errStr);
  }
  return ret
}

function getData(dataFormat) {
  var Form = document.forms.scoutingForm;
  var UniqueFieldNames = [];
  var fd = new FormData();
  var str = [];

  switch (checkboxAs) {
    case 'TF':
      checkedChar = 'T';
      uncheckedChar = 'F';
      break;
    case '10':
      checkedChar = '1';
      uncheckedChar = '0';
      break;
    case 'TrueFalse':
      checkedChar = 'True';
      uncheckedChar = 'False';
      break;
    default:
      var checkedChar = 'Y';
      var uncheckedChar = 'N';
  }

  // collect the names of all the elements in the form
  var fieldnames = Array.from(Form.elements, formElmt => formElmt.name);

  // make sure to add the name attribute only to elements from which you want to collect values.  Radio button groups all share the same name
  // so those element names need to be de-duplicated here as well.
  fieldnames.forEach((fieldname) => {
    if (fieldname != "" && !UniqueFieldNames.includes(fieldname)) {
      UniqueFieldNames.push(fieldname)
    }
  });

  UniqueFieldNames.forEach((fieldname) => {
    var thisField = Form[fieldname];

    if (thisField.type == 'checkbox') {
      var thisFieldValue = thisField.checked ? checkedChar : uncheckedChar;
    } else {
      var thisFieldValue = thisField.value ? thisField.value.replace(/"/g, '').replace(/;/g, "-") : "";
    }
    fd.append(fieldname, thisFieldValue)
  })

  if (dataFormat == "kvs") {
    Array.from(fd.keys()).forEach(thisKey => {
      str.push(thisKey + "=" + fd.get(thisKey))
    });
    return str.join(";")
  } else if (dataFormat == "tsv") {
    Array.from(fd.keys()).forEach(thisKey => {
      str.push(fd.get(thisKey))
    });
    return str.join("\t")
  } else {
    return "unsupported dataFormat"
  }
}

function getHeaders(dataFormat) {
  var Form = document.forms.scoutingForm;
  var UniqueFieldNames = [];

  // collect the names of all the elements in the form
  var fieldnames = Array.from(Form.elements, formElmt => formElmt.name);

  // make sure to add the name attribute only to elements from which you want to collect values.  Radio button groups all share the same name
  // so those element names need to be de-duplicated here as well.
  fieldnames.forEach((fieldname) => {
    if (fieldname != "" && !UniqueFieldNames.includes(fieldname)) {
      UniqueFieldNames.push(fieldname)
    }
  });

  if (dataFormat == "kvs") {
    return UniqueFieldNames.join(";")
  } else if (dataFormat == "tsv") {
    return UniqueFieldNames.join("\t")
  } else {
    return "unsupported dataFormat"
  }

}


function clearForm() {
  var match = 0;
  var e = 0;

  if (pitScouting) {
    swipePage(-1);
  } else {
    swipePage(-5);

    // Increment match
    match = parseInt(document.getElementById("input_m").value)
    if (match == NaN) {
      document.getElementById("input_m").value = ""
    } else {
      document.getElementById("input_m").value = match + 1
    }
    
    document.getElementById("input_t").value = getCurrentTeamNumberFromRobot().replace("frc", "");
    onTeamnameChange();



    // Robot
    // resetRobot()
  }

  // Clear XY coordinates
  inputs = document.querySelectorAll("[id*='XY_']");
  for (e of inputs) {
    code = e.id.substring(3)
    e.value = "[]"
  }

  inputs = document.querySelectorAll("[id*='input_']");
  for (e of inputs) {
    code = e.id.substring(6)

    // Don't clear key fields
    if (code == "m") continue
    if (code == "t") continue
    if (code.substring(0, 2) == "r_") continue
    if (code.substring(0, 2) == "l_") continue
    if (code == "e") continue
    if (code == "s") continue

    if (e.className == "clickableImage") {
      e.value = "[]";
      continue;
    }

    radio = code.indexOf("_")
    if (radio > -1) {
      var baseCode = code.substr(0, radio)
      if (e.checked) {
        e.checked = false
        document.getElementById("display_" + baseCode).value = ""
      }
      var defaultValue = document.getElementById("default_" + baseCode).value
      if (defaultValue != "") {
        if (defaultValue == e.value) {
          e.checked = true
          document.getElementById("display_" + baseCode).value = defaultValue
        }
      }
    } else {
      if (e.type == "number" || e.type == "text" || e.type == "textarea"  || e.type == "hidden") {
        if ((e.className == "counter") ||
          (e.className == "timer") ||
          (e.className == "cycle")) {
          e.value = 0
          if (e.className == "timer" || e.className == "cycle") {
            // Stop interval
            timerStatus = document.getElementById("status_" + code);
            startButton = document.getElementById("start_" + code);
            intervalIdField = document.getElementById("intervalId_" + code);
            var intervalId = intervalIdField.value;
            timerStatus.value = 'stopped';
            startButton.innerHTML = "Start";
            if (intervalId != '') {
              clearInterval(intervalId);
            }
            intervalIdField.value = '';
            if (e.className == "cycle") {
              document.getElementById("cycletime_" + code).value = "[]"
              document.getElementById("display_" + code).value = ""
            }
          }
        } else {
          e.value = ""
        }
      } else if (e.type == "checkbox") {
        if (e.checked == true) {
          e.checked = false
        }
      } else {
        console.log("unsupported input type")
      }
    }
  }
  drawFields()
}

function getIdBase(name) {
  return name.slice(name.indexOf("_"), name.length)
}

function getTeamName(teamNumber) {
  if (teamNumber !== undefined) {
    if (teams) {
      var teamKey = "frc" + teamNumber;
      var ret = "";
      Array.from(teams).forEach(team => ret = team.key == teamKey ? team.nickname : ret);
      return ret;
    }
  }
  return "";
}

function getMatch(matchKey) {
  //This needs to be different than getTeamName() because of how JS stores their data
  if (matchKey !== undefined) {
    if (schedule) {
      var ret = "";
      Array.from(schedule).forEach(match => ret = match.key == matchKey ? match.alliances : ret);
      return ret;
    }
  }
  return "";
}

function getCurrentTeamNumberFromRobot() {
  if (getRobot() != "" && typeof getRobot() !== 'undefined' && getCurrentMatch() != "") {
    if (getRobot().charAt(0) == "r") {
      return getCurrentMatch().red.team_keys[parseInt(getRobot().charAt(1)) - 1]
    } else if (getRobot().charAt(0) == "b") {
      return getCurrentMatch().blue.team_keys[parseInt(getRobot().charAt(1)) - 1]
    }
  }
}

function getCurrentMatchKey() {
  return document.getElementById("input_e").value + "_" + getLevel() + document.getElementById("input_m").value;
}

function getCurrentMatch() {
  return getMatch(getCurrentMatchKey());
}

function updateMatchStart(event) {
  if ((getCurrentMatch() == "") ||
    (!teams)) {
    console.log("No match or team data.");
    return;
  }
  if (event.target.id.startsWith("input_r")) {
    document.getElementById("input_t").value = getCurrentTeamNumberFromRobot().replace("frc", "");
    onTeamnameChange();
  }
  if (event.target.id == "input_m") {
    if (getRobot() != "" && typeof getRobot()) {
      try {
        document.getElementById("input_t").value = getCurrentTeamNumberFromRobot().replace("frc", "");
      } catch (error) {
      }
      onTeamnameChange();
    }
  }
}

function onTeamnameChange(event) {
  var newNumber = document.getElementById("input_t").value;
  var teamLabel = document.getElementById("teamname-label");
  if (newNumber != "") {
    teamLabel.innerText = getTeamName(newNumber) != "" ? "You are scouting " + getTeamName(newNumber) : "That team isn't playing this match, please double check to verify correct number";
  } else {
    teamLabel.innerText = "";
  }
}

function displayData() {
  document.getElementById('data').innerHTML = getData(dataFormat);
}

function copyData() {
  navigator.clipboard.writeText(getData(dataFormat));
  document.getElementById('copyButton').setAttribute('value', 'Copied');
}

function displayHeaders() {
  document.getElementById('dataHeaders').innerHTML = getHeaders(dataFormat);
}

function copyHeaders() {
  navigator.clipboard.writeText(getHeaders(dataFormat));
  document.getElementById('copyHeadersButton').setAttribute('value', 'Copied');
}


function clearStorageData() {
  if (confirm("Delete all stored matches?")) {
    localStorage.clear();
    document.getElementById('prevDataTable').innerHTML = "";
  }
}

function createPrevDataTable() {
  prevData = document.getElementById('prevDataTable');
  prevData.innerHTML = "";
  
  var keys = []

  for (let i = 0; i < localStorage.length; i++)
  {
    keys.push(localStorage.key(i));
  }
  keys.sort();

  for (var i=0; i<keys.length; i++) {
    let data = localStorage.getItem(keys[i]);
    var row = prevData.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = data + '&nbsp;';
    cell1.setAttribute('width', '80%');

    var cell2 = row.insertCell(1);
    const newButton = document.createElement('button');
    newButton.textContent = 'Show QR';
    newButton.addEventListener('click', () => {
      qr.makeCode(data);
      document.getElementById("display_qr-info").textContent = data;
    });
    cell2.appendChild(newButton);
  }
}

function saveDataToStorage() {
  var key = document.getElementById("input_e").value + "_" + document.getElementById("input_m").value + "_" + getRobot()

  data = getData(dataFormat);

  localStorage.setItem(key, data);
  createPrevDataTable();
}


window.onload = function () {
  let ret = configure();
  if (ret != -1) {
    let ece = document.getElementById("input_e");
    let ec = null;
    if (ece != null) {
      ec = ece.value;
    }
    if (ec != null) {
      getTeams(ec);
      getSchedule(ec);
    }
    this.drawFields();
    if (enableGoogleSheets) {
      console.log("Enabling Google Sheets.");
      setUpGoogleSheets();
    }
  }

  createPrevDataTable();
};