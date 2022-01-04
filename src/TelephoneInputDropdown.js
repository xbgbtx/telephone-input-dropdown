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
    this.format = '(dddd)-ddd-ddd';
  }

  render() {
    return html`
      <label for="number-inputs">Input telephone number:</label>
      <fieldset id="number-inputs">${this.generateFormInputs()}</fieldset>
      <p>Value: ${this.value}</p>
    `;
  }

  formInput(f) {
    const digits = [...Array(10).keys()];
    const changeHandler = e => {
      this.value = this.readNumbers();
    };
    switch (f) {
      case 'd':
        return html`<select class="number-select" @change=${changeHandler}>
          ${digits.map(d => html`<option>${d}</option>`)}
        </select>`;
      default:
        return html`<span class="format-text">${f}</span>`;
    }
  }

  generateFormInputs() {
    return this.format.split('').map(f => this.formInput(f));
  }

  readNumbers() {
    const fieldset = this.shadowRoot.getElementById('number-inputs');
    return [...fieldset.childNodes].map(n => n.value).join('');
  }
}
