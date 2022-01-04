import { html, css, LitElement } from 'lit';

export class TelephoneInputDropdown extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--telephone-input-dropdown-text-color, #000);
      }

      .format-text {
        font-size: xxx-large;
        padding-left: 2px;
        padding-right: 3px;
      }

      #number-inputs {
        display: inline-block;
        vertical-align: middle;
      }

      .number-select {
        transform: translateY(-25%);
      }
    `;
  }

  static get properties() {
    return {
      value: { type: String },
      format: { type: String },
    };
  }

  constructor() {
    super();
    this.value = null;
    this.format = '(dddd)-ddd-dddd';
  }

  render() {
    return html`
      <fieldset id="number-inputs">
        <legend>Telephone Number</legend>
        ${this.generateFormInputs()}
      </fieldset>
    `;
  }

  generateFormInputs() {
    const formatChars = this.format.split('');
    const output = [];
    const digits = [...Array(10).keys()];
    const changeHandler = () => {
      this.value = this.readNumbers();
    };
    let nextInputId = 1;
    const inputIdString = () => `number-select-${nextInputId}`;

    for (const c of formatChars) {
      switch (c) {
        case 'd':
          output.push(html` <label for=${inputIdString()}
              >Number input ${nextInputId}</label
            >
            <select
              id=${inputIdString()}
              class="number-select"
              @change=${changeHandler}
              aria-label="number select"
            >
              ${digits.map(d => html`<option>${d}</option>`)}
            </select>`);
          nextInputId += 1;
          break;
        default:
          output.push(html`<span class="format-text">${c}</span>`);
      }
    }
    return output;
  }

  readNumbers() {
    const fields = this.getNumberSelects();
    return fields.map(n => n.value).join('');
  }

  getNumberSelects() {
    const fieldset = this.shadowRoot.getElementById('number-inputs');
    return [...fieldset.childNodes].filter(
      f => f.tagName.toLowerCase() === 'select'
    );
  }
}
