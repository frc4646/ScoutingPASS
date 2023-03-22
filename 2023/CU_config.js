var config_data = `
{
  "title": "Scouting PASS 2023",
  "page_title": "4646 Scouting app",
  "checkboxAs": "TF",
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
      "shape": "circle 12 black red true"
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
    { "name": "Cycle Timer",
      "code": "tct",
      "type": "cycle"
    },
    { "name": "Grid Scoring",
      "code": "tsg",
      "type": "clickable_image",
      "filename": "2023/grid_image.png",
      "dimensions": "9 4",
      "clickRestriction": "onePerBox",
      "toggleClick": "true",
      "showFlip": "false",
      "showUndo": "false",
      "shape": "circle 12 black red true",
      "cycleTimer": "tct"
    },
    { "name": "Feeder Count<br>(Fed another bot)",
      "code": "tfc",
      "type": "counter",
      "cycleTimer": "tct"
    },
    { "name": "Was Fed<br>Game Pieces",
      "code": "wf",
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
      "type": "bool"
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
    }
  ],
  "endgame": [
    { "name": "Docking Timer",
      "code": "dt",
      "type": "timer"
    },
    { "name": "Final Status",
      "code": "fs",
      "type":"radio",
      "choices": {
        "e": "Engaged<br>",
        "d": "Docked (Not Engaged)<br>",
        "p": "Parked<br>",
        "a": "Attempted but failed<br>",
        "x": "Not attempted"
      },
      "defaultValue": "x"
    }
  ],
  "postmatch": [
    { "name": "Driver Skill",
      "code": "ds",
      "type": "radio",
      "choices": {
        "v": "Very Effective<br>",
        "a": "Average<br>",
        "n": "Not Effective<br>",
        "x": "Not Observed"
      },
      "defaultValue": "x"
    },
    { "name": "Defense Rating",
      "code": "dr",
      "type": "radio",
      "choices": {
        "e": "Excellent<br>",
        "g": "Good<br>",
        "a": "Average<br>",
        "b": "Below Average<br>",
        "x": "Did not play defense"
      },
      "defaultValue": "x"
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
    { "name": "Dropped Cones (>2)",
      "code": "dc",
      "type": "bool"
    },
    { "name": "Make good<br>alliance partner?",
      "tooltip": "Would you want this robot on your alliance in eliminations?",
      "code": "all",
      "type": "bool"
    },
    { "name": "Comments",
      "code": "co",
      "type": "text",
      "size": 15,
      "maxSize": 500
    }
  ]
}`;
