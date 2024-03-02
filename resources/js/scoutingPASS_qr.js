function updateQRHeader() {
    let str = 'Event: !EVENT! Match: !MATCH! Robot: !ROBOT! Team: !TEAM!';

    if (!pitScouting) {
        str = str
            .replace('!EVENT!', document.getElementById("input_e").value)
            .replace('!MATCH!', document.getElementById("input_m").value)
            .replace('!ROBOT!', document.getElementById("display_r").value)
            .replace('!TEAM!', document.getElementById("input_t").value);
    } else {
        str = 'Pit Scouting - Team !TEAM!'
            .replace('!TEAM!', document.getElementById("input_t").value);
    }

    document.getElementById("display_qr-info").textContent = str;
}


function qr_regenerate() {
    // Validate required pre-match date (event, match, level, robot, scouter)
    if (!pitScouting) {
        if (validateData() == false) {
            // Don't allow a swipe until all required data is filled in
            return false
        }
    }

    // Get data
    data = getData(dataFormat);

    // Regenerate QR Code
    qr.makeCode(data);

    updateQRHeader();
    
    saveDataToStorage();
    return true
}

function qr_clear() {
    qr.clear()
}