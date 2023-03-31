var config_data = `
{
  "title": "Scouting PASS 2023",
  "page_title": "4646 Scouting app",
  "checkboxAs": "10",
  "prematch": [
    { "name": "Scouter Initials",
      "code": "s",
      "type": "scouter",
      "size": 5,
      "maxSize": 10,
      "required": "true"
    },
    { "name": "Event",
      "code": "e",
      "type": "event",
      "defaultValue": "2023iacf",
      "required": "true",
      "disabled": "true"
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
      "max": 100,
      "required": "true"
    },
    { "name": "Robot",
      "code": "r",
      "type": "robot",
      "choices": {
        "red1": "Red-1",
        "blue1": "Blue-1<br>",
        "red2": "Red-2",
        "blue2": "Blue-2<br>",
        "red3": "Red-3",
        "blue3": "Blue-3"
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
      "type": "clickable_image",
      "filename": "2023/field_image.png",
      "clickRestriction": "one",
      "shape": "circle 5 black red true"
    }
  ],
  "auton": [
    { "name": "Auto Scoring",
      "code": "asg",
      "type": "clickable_image",
      "filename": "2023/grid_image.png",
      "dimensions": "9 4",
      "clickRestriction": "onePerBox",
      "toggleClick": "true",
      "showFlip": "false",
      "showUndo": "false",
      "shape": "circle 12 black blue true"
    },
    { "name": "Droped Peice Count",
      "code": "adc",
      "type": "counter"
    },
    { "name": "Crossed Cable",
      "code": "acc",
      "type": "bool"
    },
    { "name": "Crossed Charging Station",
      "code": "acs",
      "type": "bool"
    },
    { "name": "Mobility?",
      "code": "am",
      "type": "bool"
    },
    { "name": "Docked",
      "code": "ad",
      "type":"radio",
      "choices": {
        "e": "Engaged<br>",
        "d": "Docked (not Engaged)<br>",
        "a": "Attempted but failed<br>",
        "x": "Not attempted"
      },
      "defaultValue": "x"
    }
  ],
  "teleop": [
    { "name": "Grid Scoring",
      "code": "tsg",
      "type": "clickable_image",
      "filename": "2023/grid_image.png",
      "dimensions": "9 4",
      "clickRestriction": "onePerBox",
      "toggleClick": "true",
      "showFlip": "false",
      "showUndo": "false",
      "shape": "circle 12 black red true"
    },
    { "name": "Droped Peice Count",
      "code": "tdc",
      "type": "counter"
    },
    { "name": "Links Scored",
    "code": "ls",
    "type": "counter"
  }, 
  { "name": "Penalties Earned",
  "code": "pe",
  "type": "counter"
},

    { "name": "Pushed Game Peices",
      "code": "wf",
      "type": "bool"
    },
    { "name": "Played Defence?",
    "code": "pdef",
    "type": "bool"
  },
    { "name": "Was Defended",
      "code": "wd",
      "type": "bool"
    },
    { "name": "Who Defended this bot",
      "code": "who",
      "type": "text"
    },
    { "name": "Smart Placement<br>(creates Links)",
      "code": "lnk",
      "type": "radio",
      "choices": {
        "y": "Yes<br>",
        "n": "No<br>",
        "z": "Not Observed"
      },
        "defaultValue": "z"
    },
    { "name": "Floor Pickup",
      "code": "fpu",
      "type": "radio",
      "choices": {
        "o": "Cones<br>",
        "u": "Cubes<br>",
        "b": "Both<br>",
        "x": "Not Attempted"
      },
      "defaultValue": "x"
    },  
    { "name": "Human Player Stations Used",
    "code": "hpsu",
    "type": "radio",
    "choices": {
      "3": "Drop Station<br>",
      "2": "Shelf Stattion<br>",
      "1": "Both<br>",
      "0": "None"
    },
    "defaultValue": "0"
  }
  ],
  "endgame": [

    { "name": "Final Status",
      "code": "fs",
      "type":"radio",
      "choices": {
        "e": "Engaged<br>",
        "d": "Docked (Not Engaged)<br>",
        "p": "Parked<br>",
        "a": "Attempted but failed<br>",
        "x": "Not attempted<br>"
      },
      "defaultValue": "x"
    }
  ],
  "postmatch": [
    { "name": "Driver Skill",
      "code": "ds",
      "type": "radio",
      "choices": {
        "3": "Very Effective<br>",
        "2": "Average<br>",
        "1": "Not Effective<br>",
        "0": "Not Observed<br>"
      },
      "defaultValue": "0"
    },

    { "name": "Defense Rating",
      "code": "dr",
      "type": "radio",
      "choices": {
        "4": "Excellent<br>",
        "3": "Good<br>",
        "2": "Average<br>",
        "1": "Below Average<br>",
        "0": "Did not play defense<br>"
      },
      "defaultValue": "0"
    },
    { "name": "Speed Rating",
      "code": "sr",
      "type": "radio",
      "choices": {
        "1": "1 (slow)<br>",
        "2": "2<br>",
        "3": "3<br>",
        "4": "4<br>",
        "5": "5 (fast)"
      },
      "defaultValue":"3"
    },
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
      "type": "radio",
      "choices": {
        "y": "Yes<br>",
        "n": "No<br>",
        "s": "Not Sure" 
      },
      "required": "true"
    },
    { "name": "Comments",
      "code": "co",
      "type": "text",
      "size": 15,
      "maxSize": 500,
      "defaultValue" : " "
    }
  ]
}`;
