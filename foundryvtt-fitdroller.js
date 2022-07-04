class Roller {
/**
* Create popup for roller
* @return none
*/


async FitDRollerPopup() {

  const maxDice = game.settings.get("foundryvtt-fitdroller", "maxDiceCount");
  const defaultDice = game.settings.get("foundryvtt-fitdroller", "defaultDiceCount") + 1;

  new Dialog({
    title: `${game.i18n.localize('FitDRoller.RollTitle')}`,
    content: `
      <h2>${game.i18n.localize('FitDRoller.Roll')}</h2>

      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Pos / Effect</th>
              <th><label>${game.i18n.localize('FitDRoller.EffectLimited')}</label></th>
              <th><label>${game.i18n.localize('FitDRoller.EffectStandard')}</label></th>
              <th><label>${game.i18n.localize('FitDRoller.EffectGreat')}</label></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><label>${game.i18n.localize('FitDRoller.PositionControlled')}</label></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
            </tr>
            
            <tr>
              <td><label>${game.i18n.localize('FitDRoller.PositionRisky')}</label></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
            </tr>

            <tr>
              <td><label>${game.i18n.localize('FitDRoller.PositionDesperate')}</label></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
              <td class="centered"><div class="rollButton"><INPUT type="submit" name="" value=""></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <form>
        <div class="form-group">
          <div class="form-group roll">
          <div><label>${game.i18n.localize('FitDRoller.RollNumberOfDice')}:</label></div>

          <div class="rollRadio2" id="dice">
            <input type="radio" id="0d" name="dice" value="0" />
            <label for="0d" class="diceNumber">0</label>

            <input type="radio" id="1d" name="dice" value="1" />
            <label for="1d" class="diceNumber">1</label>

            <input type="radio" id="2d" name="dice" value="2" />
            <label for="2d" class="diceNumber">2</label>

            <input type="radio" id="3d" name="dice" value="3" />
            <label for="3d" class="diceNumber">3</label>

            <input type="radio" id="4d" name="dice" value="4" />
            <label for="4d" class="diceNumber">4</label>

            <input type="radio" id="5d" name="dice" value="5" />
            <label for="5d" class="diceNumber">5</label>

            <input type="radio" id="6d" name="dice" value="6" />
            <label for="6d" class="diceNumber">6</label>
          </div>
        </div>

          <script>$('#dice option[value="' + game.settings.get("foundryvtt-fitdroller", "defaultDiceCount") + '"]').prop("selected", "selected");</script>
          <script>$('#pos option[value="' + game.settings.get("foundryvtt-fitdroller", "defaultPosition") + '"]').prop("selected", "selected");</script>
          <script>$('#fx option[value="' + game.settings.get("foundryvtt-fitdroller", "defaultEffect") + '"]').prop("selected", "selected");</script>

        </div>
      </form>
    `,
    buttons: {
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: game.i18n.localize('FitDRoller.Roll'),
        callback: async (html) =>
        {
          const dice_amount = parseInt(html.find('[name="dice"]')[0].value);
          const position = html.find('[name="pos"]')[0].value;
          const effect = html.find('[name="fx"]')[0].value;
          await this.FitDRoller("", dice_amount, position, effect);
        }
      },
      no: {
        icon: "<i class='fas fa-times'></i>",
        label: game.i18n.localize('FitDRoller.Close'),
      },
    },
    default: "yes",
  }).render(true);
}


/**
 * Roll Dice.
 * @param {string} attribute arbitrary label for the roll
 * @param {int} dice_amount number of dice to roll
 * @param {string} position position
 * @param {string} effect effect
 */
async FitDRoller(attribute = "", dice_amount = 0, position = "risky", effect = "standard") {
  let versionParts;
  if( game.version ) {
    versionParts = game.version.split( '.' );
    game.majorVersion = parseInt( versionParts[0] );
    game.minorVersion = parseInt( versionParts[1] );
  } else {
    versionParts = game.data.version.split( '.' );
    game.majorVersion = parseInt( versionParts[1] );
    game.minorVersion = parseInt( versionParts[2] );
  }

  let zeromode = false;
  if (dice_amount < 0) { dice_amount = 0; }
  if (dice_amount === 0) { zeromode = true; dice_amount = 2; }

  const r = new Roll(`${dice_amount}d6`, {});

  if (game.majorVersion > 7) {
    await r.evaluate({async: true});
  } else {
    r.roll();
  }
  return await this.showChatRollMessage( r, zeromode, attribute, position, effect );
}

/**
 * Shows Chat message.
 *
 * @param {Roll} r array of rolls
 * @param {Boolean} zeromode whether to treat as if 0d
 * @param {string} attribute arbitrary label for the roll
 * @param {string} position position
 * @param {string} effect effect
 */
async showChatRollMessage(r, zeromode, attribute = "", position = "", effect = "") {
  let versionParts;
  if( game.version ) {
    versionParts = game.version.split( '.' );
    game.majorVersion = parseInt( versionParts[0] );
    game.minorVersion = parseInt( versionParts[1] );
  } else {
    versionParts = game.data.version.split( '.' );
    game.majorVersion = parseInt( versionParts[1] );
    game.minorVersion = parseInt( versionParts[2] );
  }

  const speaker = ChatMessage.getSpeaker();
  let rolls = [];


  rolls = (r.terms)[0].results;


  // Retrieve Roll status.
  let roll_status = "";

  roll_status = this.getFitDActionRollStatus(rolls, zeromode);
  let color = game.settings.get("foundryvtt-fitdroller", "backgroundColor");

  let position_localize = '';
  switch (position)
  {
    case 'controlled':
      position_localize = 'FitDRoller.PositionControlled';
      break;
    case 'desperate':
      position_localize = 'FitDRoller.PositionDesperate';
      break;
    case 'risky':
    default:
      position_localize = 'FitDRoller.PositionRisky';
  }

  let effect_localize = '';
  switch (effect)
  {
    case 'limited':
      effect_localize = 'FitDRoller.EffectLimited';
      break;
    case 'great':
      effect_localize = 'FitDRoller.EffectGreat';
      break;
    case 'standard':
    default:
      effect_localize = 'FitDRoller.EffectStandard';
  }

  const result = await renderTemplate("modules/foundryvtt-fitdroller/templates/fitd-roll.html", { rolls, roll_status, attribute, position, position_localize, effect, effect_localize, zeromode, color });

  const messageData = {
    speaker,
    content: result,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    roll: r
  };
  if (game.majorVersion > 7) {
    return CONFIG.ChatMessage.documentClass.create(messageData, {});
  } else {
    return CONFIG.ChatMessage.entityClass.create(messageData, {});
  }
}

/**
 *  Get status of the Roll.
 *  - failure
 *  - partial-success
 *  - success
 *  - critical-success
 * @param {Array} rolls results of dice rolls
 * @param {Boolean} zeromode whether to treat as if 0d
 * @returns {string} success/failure status of roll
 */
getFitDActionRollStatus(rolls, zeromode = false) {

  let sorted_rolls = [];
  // Sort roll values from lowest to highest.
  sorted_rolls = rolls.map((i) => i.result).sort();


  let roll_status = "failure";

  if (sorted_rolls[0] === 6 && zeromode)
  {
    roll_status = "critical-success";
  }
  else
  {
    let use_die;
    let prev_use_die = false;

    if (zeromode)
    {
      use_die = sorted_rolls[0];
    }
    else
    {
      use_die = sorted_rolls[sorted_rolls.length - 1];

      if (sorted_rolls.length - 2 >= 0)
      {
        prev_use_die = sorted_rolls[sorted_rolls.length - 2];
      }
    }

    // 1,2,3 = failure
    if (use_die <= 3)
    {
      roll_status = "failure";
    }
    // if 6 - check the prev highest one.
    else if (use_die === 6)
    {
      // 6,6 - critical success
      if (prev_use_die && prev_use_die === 6)
      {
        roll_status = "critical-success";
      }
      // 6 - success
      else
      {
        roll_status = "success";
      }
    }
    // else (4,5) = partial success
    else
    {
      roll_status = "partial-success";
    }

  }

  return roll_status;

}
}

Hooks.once("ready", () => {
	game.fitdroller = new Roller();
});

// getSceneControlButtons
Hooks.on("renderSceneControls", (app, html) => {
  const dice_roller = $('<li class="scene-control" title="FitD Roller"><i class="fas fa-dice"></i></li>');
  dice_roller.on( "click", async function() {
    await game.fitdroller.FitDRollerPopup();
  })
  if( isNewerVersion( game.version, '9.220' ) ) {
    html.children().first().append( dice_roller );
  } else {
    html.append( dice_roller );
  }
});

Hooks.once("init", () => {
  game.settings.register("foundryvtt-fitdroller", "backgroundColor", {
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

  game.settings.register("foundryvtt-fitdroller", "maxDiceCount", {
		"name": game.i18n.localize("FitDRoller.maxDiceCountName"),
		"hint": game.i18n.localize("FitDRoller.maxDiceCountHint"),
		"scope": "world",
		"config": true,
		"default": 10,
		"type": Number
	});

	game.settings.register("foundryvtt-fitdroller", "defaultDiceCount", {
		"name": game.i18n.localize("FitDRoller.defaultDiceCountName"),
		"hint": game.i18n.localize("FitDRoller.defaultDiceCountHint"),
		"scope": "world",
		"config": true,
		"default": 2,
		"type": Number
	});

  game.settings.register("foundryvtt-fitdroller", "defaultPosition", {
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

	game.settings.register("foundryvtt-fitdroller", "defaultEffect", {
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
});

console.log("FitDRoller | Forged in the Dark Dice Roller loaded");
