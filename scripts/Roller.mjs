export default class Roller {
  /**
   * Create popup for roller
   * @return none
   */

  constructor() {
    this.moduleName = "fitd-roller-alt";
  }

  async FitDRollerPopup() {
    const maxDice = game.settings.get(this.moduleName, "maxDiceCount");
    const defaultDice = game.settings.get(this.moduleName, "defaultDiceCount") + 1;

    new Dialog({
      title: `${game.i18n.localize('FitDRoller.RollTitle')}`,
      content: ` 

      

    <form>
      <h3>${game.i18n.localize('FitDRoller.RollNumberOfDice')}:</h3>
      <div class="rollRadio2" id="numberOfDice">
        <input type="radio" id="0d" name="dice" value="0" />
        <label for="0d" class="diceNumber bgRed">0</label>

        <input type="radio" id="1d" name="dice" value="1" />
        <label for="1d" class="diceNumber">1</label>

        <input type="radio" id="2d" name="dice" value="2" checked/>
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

      <hr style="margin. 3px;">

      <h3>${game.i18n.localize('FitDRoller.TablePosEffect')}</h3>

      <table id="rollMatrix">
        <colgroup>
        <col class="first-col">
        <col class="fx-col">
        <col class="fx-col">
        <col class="fx-col">
        <col class="fx-col">
        <col class="fx-col">
        </colgroup>

        <tr>
          <th></th>
          <th><label>${game.i18n.localize('FitDRoller.EffectZero')}</label></th>
          <th><label>${game.i18n.localize('FitDRoller.EffectLimited')}</label></th>
          <th><label>${game.i18n.localize('FitDRoller.EffectStandard')}</label></th>
          <th><label>${game.i18n.localize('FitDRoller.EffectGreat')}</label></th>
          <th><label>${game.i18n.localize('FitDRoller.EffectExtreme')}</label></th>
        </tr>

        <tr>
          <td><label>${game.i18n.localize('FitDRoller.PositionControlled')}</label></td>
          <td><button type="button" name="bt01" value="bt01" class="rollButton"></td>
          <td><button type="button" name="bt02" value="bt02" class="rollButton"></td>
          <td><button type="button" name="bt03" value="bt03" class="rollButton"></td>
          <td><button type="button" name="bt04" value="bt04" class="rollButton"></td>
          <td><button type="button" name="bt05" value="bt05" class="rollButton"></td>
        </tr>

        <tr>
          <td><label>${game.i18n.localize('FitDRoller.PositionRisky')}</label></td>
          <td><button type="button" name="bt06" value="bt06" class="rollButton"></td>
          <td><button type="button" name="bt07" value="bt07" class="rollButton"></td>
          <td><button type="button" name="bt08" value="bt08" class="rollButton"></td>
          <td><button type="button" name="bt09" value="bt09" class="rollButton"></td>
          <td><button type="button" name="bt10" value="bt10" class="rollButton"></td>
        </tr>

        <tr>
          <td><label>${game.i18n.localize('FitDRoller.PositionDesperate')}</label></td>
          <td><button type="button" name="bt11" value="bt11" class="rollButton"></td>
          <td><button type="button" name="bt12" value="bt12" class="rollButton"></td>
          <td><button type="button" name="bt13" value="bt13" class="rollButton"></td>
          <td><button type="button" name="bt14" value="bt14" class="rollButton"></td>
          <td><button type="button" name="bt15" value="bt15" class="rollButton"></td>
        </tr>
      </table>
    </form>   
       
    `,
      buttons: {},
      render: ([html]) => {     
        html.addEventListener("click", async ({ target }) => {
          if (!target.matches(".rollButton")) return;
          const currentForm = target.closest("form");
          const buttonValue = target.closest("form").querySelector("button").value;

          const numberOfDice = parseInt(target.closest("form").querySelector("input[name='dice']:checked").value);

          let position;
          let effect;
          switch(buttonValue) {
            case 'bt01':
              position = 'controlled';
              effect = 'zero';
              break;
            case 'bt02':
              position = 'controlled';
              effect = 'limited';
              break;
            case 'bt03':
              position = 'controlled';
              effect = 'standard';
              break;     
            case 'bt04':
              position = 'controlled';
              effect = 'great';
              break;  
            case 'bt05':
              position = 'controlled';
              effect = 'extreme';
              break;   
            case 'bt06':
              position = 'risky';
              effect = 'zero';
              break;
            case 'bt07':
              position = 'risky';
              effect = 'limited';
              break;
            case 'bt08':
              position = 'risky';
              effect = 'standard';
              break;     
            case 'bt09':
              position = 'risky';
              effect = 'great';
              break;  
            case 'bt10':
              position = 'risky';
              effect = 'extreme';
              break;    
            case 'bt11':
              position = 'desperate';
              effect = 'zero';
              break;
            case 'bt12':
              position = 'desperate';
              effect = 'limited';
              break;
            case 'bt13':
              position = 'desperate';
              effect = 'standard';
              break;     
            case 'bt14':
              position = 'desperate';
              effect = 'great';
              break;  
            case 'bt15':
              position = 'desperate';
              effect = 'extreme';
              break;               
            default:
              console.log("error 666!");
          }
          
          // test
          console.log('----------------');
          console.log(numberOfDice);
          console.log( buttonValue);
          console.log( position);
          console.log( effect);
          console.log('----------------');
          
          await this.FitDRoller("", numberOfDice, position, effect);          
        })
          
      // render end       
      } 
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
    if (game.version) {
      versionParts = game.version.split('.');
      game.majorVersion = parseInt(versionParts[0]);
      game.minorVersion = parseInt(versionParts[1]);
    } else {
      versionParts = game.data.version.split('.');
      game.majorVersion = parseInt(versionParts[1]);
      game.minorVersion = parseInt(versionParts[2]);
    }

    let zeromode = false;
    if (dice_amount < 0) {
      dice_amount = 0;
    }
    if (dice_amount === 0) {
      zeromode = true;
      dice_amount = 2;
    }

    const r = new Roll(`${dice_amount}d6`, {});

    if (game.majorVersion > 7) {
      await r.evaluate({
        async: true
      });
    } else {
      r.roll();
    }
    return await this.showChatRollMessage(r, zeromode, attribute, position, effect);
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
    if (game.version) {
      versionParts = game.version.split('.');
      game.majorVersion = parseInt(versionParts[0]);
      game.minorVersion = parseInt(versionParts[1]);
    } else {
      versionParts = game.data.version.split('.');
      game.majorVersion = parseInt(versionParts[1]);
      game.minorVersion = parseInt(versionParts[2]);
    }

    const speaker = ChatMessage.getSpeaker();
    let rolls = [];


    rolls = (r.terms)[0].results;


    // Retrieve Roll status.
    let roll_status = "";

    roll_status = this.getFitDActionRollStatus(rolls, zeromode);
    let color = game.settings.get(this.moduleName, "backgroundColor");

    let position_localize = '';
    switch (position) {
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
    switch (effect) {
      case 'zero':
        effect_localize = 'FitDRoller.EffectZero';
        break;
      case 'limited':
        effect_localize = 'FitDRoller.EffectLimited';
        break;
      case 'great':
        effect_localize = 'FitDRoller.EffectGreat';
        break;
      case 'extreme':
          effect_localize = 'FitDRoller.EffectExtreme';
        break;  
      case 'standard':
      default:
        effect_localize = 'FitDRoller.EffectStandard';
    }

    const result = await renderTemplate("modules/" + this.moduleName + "/templates/fitd-roll.html", {
      rolls,
      roll_status,
      attribute,
      position,
      position_localize,
      effect,
      effect_localize,
      zeromode,
      color
    });

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

    if (sorted_rolls[0] === 6 && zeromode) {
      roll_status = "critical-success";
    } else {
      let use_die;
      let prev_use_die = false;

      if (zeromode) {
        use_die = sorted_rolls[0];
      } else {
        use_die = sorted_rolls[sorted_rolls.length - 1];

        if (sorted_rolls.length - 2 >= 0) {
          prev_use_die = sorted_rolls[sorted_rolls.length - 2];
        }
      }

      // 1,2,3 = failure
      if (use_die <= 3) {
        roll_status = "failure";
      }
      // if 6 - check the prev highest one.
      else if (use_die === 6) {
        // 6,6 - critical success
        if (prev_use_die && prev_use_die === 6) {
          roll_status = "critical-success";
        }
        // 6 - success
        else {
          roll_status = "success";
        }
      }
      // else (4,5) = partial success
      else {
        roll_status = "partial-success";
      }

    }

    return roll_status;

  }
}