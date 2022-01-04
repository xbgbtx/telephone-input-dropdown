import { html, css, LitElement } from 'lit';

export class TelephoneInputDropdown extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--telephone-input-dropdown-text-color, #000);
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
    `;
  }

  generateFormInputs() {
    return this.format.split('').map(f => TelephoneInputDropdown.formInput(f));
  }

  static formInput(f) {
    const digits = [...Array(10).keys()];
    switch (f) {
      case 'd':
        return html`<select>
          ${digits.map(d => html`<option>${d}</option>`)}
        </select>`;
      default:
        return html`<span>${f}</span>`;
    }
  }
}
