import Roller from "./Roller.mjs";
const moduleName = 'fitd-roller-alt';

Hooks.once("ready", () => {
  game.fitdroller = new Roller();
});

// getSceneControlButtons
Hooks.on("renderSceneControls", (app, html) => {
  const dice_roller = $('<li class="scene-control" title="FitD Roller"><i class="fas fa-dice"></i></li>');
  dice_roller.on("click", async function() {
    await game.fitdroller.FitDRollerPopup();
  })
  if (isNewerVersion(game.version, '9.220')) {
    html.children().first().append(dice_roller);
  } else {
    html.append(dice_roller);
  }
});

Hooks.once("init", () => {
  game.settings.register(moduleName, "backgroundColor", {
    "name": game.i18n.localize("FitDRoller.backgroundColorName"),
    "hint": game.i18n.localize("FitDRoller.backgroundColorHint"),
    "scope": "world",
    "config": true,
    "choices": {
      "gray": game.i18n.localize("FitDRoller.backgroundColorGray"),
      "black": game.i18n.localize("FitDRoller.backgroundColorBlack")
    },
    "default": "gray",
    "type": String
  });

  game.settings.register(moduleName, "maxDiceCount", {
    "name": game.i18n.localize("FitDRoller.maxDiceCountName"),
    "hint": game.i18n.localize("FitDRoller.maxDiceCountHint"),
    "scope": "world",
    "config": true,
    "default": 10,
    "type": Number
  });

  game.settings.register(moduleName, "defaultDiceCount", {
    "name": game.i18n.localize("FitDRoller.defaultDiceCountName"),
    "hint": game.i18n.localize("FitDRoller.defaultDiceCountHint"),
    "scope": "world",
    "config": true,
    "default": 2,
    "type": Number
  });

  game.settings.register(moduleName, "defaultPosition", {
    "name": game.i18n.localize("FitDRoller.defaultPositionName"),
    "hint": game.i18n.localize("FitDRoller.defaultPositionHint"),
    "scope": "world",
    "config": true,
    "type": String,
    "choices": {
      "controlled": game.i18n.localize("FitDRoller.PositionControlled"),
      "risky": game.i18n.localize("FitDRoller.PositionRisky"),
      "desperate": game.i18n.localize("FitDRoller.PositionDesperate")
    },
    "default": "risky"
  });

  game.settings.register(moduleName, "defaultEffect", {
    "name": game.i18n.localize("FitDRoller.defaultEffectName"),
    "hint": game.i18n.localize("FitDRoller.defaultEffectHint"),
    "scope": "world",
    "config": true,
    "type": String,
    "choices": {
      "great": game.i18n.localize("FitDRoller.EffectGreat"),
      "standard": game.i18n.localize("FitDRoller.EffectStandard"),
      "limited": game.i18n.localize("FitDRoller.EffectLimited")
    },
    "default": "standard"
  });
  
  // --------------------------------------------------
  // Keybinding
  game.keybindings.register(moduleName, "FitDRollerShortcut", {
    name: game.i18n.localize("FitDRoller.FitDRollerShortcutName"),
    hint: game.i18n.localize("FitDRoller.FitDRollerShortcutHint"),
    editable: [{ key: "KeyD", modifiers: []}],
    onDown: async () => {
      await game.fitdroller.FitDRollerPopup();
    },
    onUp: () => {},
    restricted: false,  // Restrict this Keybinding to gamemaster only?
    reservedModifiers: [],
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
  });  
  
});

console.log("FitDRoller | Forged in the Dark Dice Roller loaded");