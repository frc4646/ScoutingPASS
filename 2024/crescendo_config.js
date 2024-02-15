var config_data = `
{
  "dataFormat": "tsv",
  "title": "Scouting PASS 2024",
  "page_title": "Crescendo",
  "checkboxAs": "10",
  "prematch": [
    { "name": "Scouter Initials",
      "code": "s",
      "type": "scouter",
      "size": 5,
      "maxSize": 5,
      "required": "true"
    },
    { "name": "Event",
      "code": "e",
      "type": "event",
      "defaultValue": "2023tnkn",
      "required": "true"
    },
    { "name": "Match Level",
      "code": "l",
      "type": "level",
      "choices": {
        "qm": "Quals<br>",
        "sf": "Semifinals<br>",
        "f": "Finals"
      },
      "defaultValue": "qm",
      "required": "true"
    },
    { "name": "Match #",
      "code": "m",
      "type": "match",
      "min": 1,
      "max": 150,
      "required": "true"
    },
    { "name": "Robot",
      "code": "r",
      "type": "robot",
      "choices": {
        "b1": "Blue-1",
        "r1": "Red-1<br>",
        "b2": "Blue-2",
        "r2": "Red-2<br>",
        "b3": "Blue-3",
        "r3": "Red-3"
      },
      "required":"true"
    },
    { "name": "Team #",
      "code": "t",
      "type": "team",
      "min": 1,
      "max": 99999
    },
    { "name": "Auto Start Position",
      "code": "as",
      "showUndo": "false",
      "type": "clickable_image",
      "filename": "2024/field_image_auto.png",
      "clickRestriction": "one",
      "dimensions": "9 5",
      "allowableResponses": "1 9 10 18 19 27 28 36 37 45",
      "shape": "circle 20 black red true",
      "width": "full"
    }
  ],

  
  "auton": [
    { "name": "Amp Scores",
      "code": "aas",
      "type": "counter"
    },
    { "name": "Speaker Scores",
      "code": "ass",
      "type": "counter"
    },
    { "name": "Speaker Shots Missed",
      "code": "asm",
      "type": "counter"
    },
    { "name": "Auto Notes",
      "code": "an",
      "type": "clickable_image",
      "filename": "2024/field_image_auto_notes.png",
      "clickRestriction": "onePerBox",
      "toggleClick": "true",
      "dimensions": "9 5",
      "allowableResponses": "2 5 8 11 14 17 20 23 26 32 41",
      "shape": "circle 25 black orange true",
      "width": "full"
    }
  ],


  "teleop": [
    { "name": "Speaker Shot Cycle Timer",
      "code": "tct",
      "type": "cycle",
      "autoStart": "true",
      "hideControls": "true"
    },
    { "name": "Speaker Shots Made",
      "code": "tsl",
      "type": "clickable_image",
      "filename": "2024/field_image.png",
      "toggleClick": "false",
      "dimensions": "9 5",
      "shape": "circle 15 black orange true",
      "width": "full",
      "cycleTimer": "tct"
    },
    { "name": "Speaker Shots Missed",
      "code": "tsm",
      "type": "counter"
    },
    { "name": "Amp Scores",
      "code": "tas",
      "type": "counter"
    },
    { "name": "Times Amplified",
      "code": "tta",
      "type": "counter"
    },
    { "name": "Dropped Notes",
      "code": "tdn",
      "type": "counter"
    },
    { "name": "Pickup From Source",
      "code": "tpus",
      "type": "bool"
    },
    { "name": "Pickup From Floor",
      "code": "tpuf",
      "type": "bool"
    },
    { "name": "Played Defense",
      "code": "tpd",
      "type": "bool"
    }
  ],


  "endgame": [
    { "name": "Onstage (Climbed the Chain)",
      "code": "ec",
      "type":"radio",
      "choices": {
        "s": "Success<br>",
        "a": "Attempted but failed<br>",
        "x": "Not attempted"
      },
      "defaultValue": "x"
    },
    { "name": "Scored Note in Trap",
      "code": "enit",
      "type": "radio",
      "choices": {
        "s": "Success<br>",
        "a": "Attempted but failed<br>",
        "x": "Not attempted"
      },
      "defaultValue": "x"
    },
    { "name": "Spotlight (Human Player)",
      "code": "eshp",
      "type": "bool"
    }
  ],


  "postmatch": [
    { "name": "Died/Immobilized",
      "code": "die",
      "type": "bool"
    },
    { "name": "Tippy<br>(almost tipped over)",
      "code": "tip",
      "type": "bool"
    },
    { "name": "Make good<br>alliance partner?",
      "tooltip": "Would you want this robot on your alliance in eliminations?",
      "code": "all",
      "type": "bool"
    },
    { "name": "Comments",
      "code": "co",
      "type": "text_area",
      "cols": 30,
      "rows": 3,
      "maxSize": 300
    },
    { "type": "label",
      "text": "Did they miss shots? Bad Strategy? Poor Driving?"
    }
  ]
}`;
