import { LitElement, html, css } from 'lit-element';

class GamepadController extends LitElement {
  constructor() {
    super();

    this.listenEvery = 500;
    this.mapping = 'nintendo';
    this.pressed = undefined;

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

  isButtonPressStart(gamepadButton) {
    return gamepadButton.pressed && !this.pressed;
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

      console.log(gamepad.axes);
      const activeButton = gamepad.buttons.findIndex(b => b.pressed || b.value > 0);
      if (activeButton === -1) {
        if (this.pressed) {
          this.dispatchEvent(
            new CustomEvent('gamepad-button-up', {
              detail: this.pressed
            })
          );
          this.pressed = undefined;
        }
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
      }

      if (this.isButtonPressStart(gamepadButton)) {
        this.pressed = mappedButton;
        this.dispatchEvent(
          new CustomEvent('gamepad-button-down', {
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
