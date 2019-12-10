import { LitElement, html, css } from 'lit-element';

class GamepadController extends LitElement {
  constructor() {
    super();

    this.listenEvery = 300;
    this.mapping = 'nintendo';

    this.pressed = {};

    this.gamepadMap = {
      'Joy-Con \\(L\\)': {
        0: {
          nintendo: 'Left'
        },
        1: {
          nintendo: 'Down'
        },
        2: {
          nintendo: 'Up'
        },
        3: {
          nintendo: 'Right'
        },
        4: {
          nintendo: 'SL'
        },
        5: {
          nintendo: 'SR'
        },
        6: {
          nintendo: 'ZL'
        },
        8: {
          nintendo: 'L'
        },
        9: {
          nintendo: '-'
        },
        16: {
          nintendo: 'Home'
        }
      },
      'Joy-Con \\(R\\)': {
        0: {
          nintendo: 'A'
        },
        1: {
          nintendo: 'X'
        },
        2: {
          nintendo: 'B'
        },
        3: {
          nintendo: 'Y'
        },
        4: {
          nintendo: 'SL'
        },
        5: {
          nintendo: 'SR'
        },
        7: {
          nintendo: 'ZR'
        },
        8: {
          nintendo: 'R'
        },
        9: {
          nintendo: '+'
        },
        16: {
          nintendo: 'Home'
        }
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.gamepadListener = setInterval(this.pollGamepad.bind(this), this.listenEvery);
  }

  disconnectedCallback() {
    clearInterval(this.gamepadListener);
    super.disconnectedCallback();
  }

  isButtonPressEnd(gamepadButton, mappedButton) {
    return !gamepadButton.pressed && this.pressed[mappedButton];
  }

  isButtonPressStart(gamepadButton, mappedButton) {
    return gamepadButton.pressed && !this.pressed[mappedButton];
  }

  pollGamepad() {
    const gamepads = Array.from(navigator.getGamepads()).filter(Boolean);
    if (gamepads.length) {
      const gamepad = gamepads[0];
      const gamepadId = Object.keys(this.gamepadMap).find(id => new RegExp(id, 'gi').test(gamepad.id));
      if (!gamepadId) {
        console.error(`No gamepad mapping found matching [${gamepad.id}]`);
        return;
      }

      const activeButton = gamepad.buttons.findIndex(b => b.pressed || b.value > 0);
      if (activeButton < 0) {
        return;
      }
      const buttonMapping = this.gamepadMap[gamepadId][activeButton];
      if (!buttonMapping) {
        console.error(`No button mapping found for gamepad [${gamepadId}] and button [${activeButton}]`);
        return;
      }

      const mappedButton = buttonMapping[this.mapping];
      if (!mappedButton) {
        console.error(
          `No button mapping found for gamepad [${gamepadId}] and button [${activeButton}] and type [${this.mapping}]`
        );
        return;
      }

      const gamepadButton = gamepad.buttons[activeButton];
      const detail = {
        gamepad,
        gamepadButton: buttonMapping,
        pressedButton: activeButton,
        button: mappedButton
      };

      if (gamepadButton.value > 0) {
        this.dispatchEvent(
          new CustomEvent('gamepad-button', {
            detail
          })
        );
      } else if (this.isButtonPressStart(gamepadButton, mappedButton)) {
        this.pressed[mappedButton] = true;
        this.dispatchEvent(
          new CustomEvent('gamepad-button-press-start', {
            detail
          })
        );
      } else if (this.isButtonPressEnd(gamepadButton, mappedButton)) {
        this.pressed[mappedButton] = false;
        this.dispatchEvent(
          new CustomEvent('gamepad-button-press-end', {
            detail
          })
        );
      }
    }
  }

  static get properties() {
    return {
      listenEvery: { type: Number, attribute: 'listen-every' },
      mapping: { type: String }
    };
  }

  render() {
    return html``;
  }
}

customElements.define('gamepad-controller', GamepadController);
