import { LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class CurrencyWidget extends LitElement {
  static get styles() {
      return css`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 250px;
          height: 250px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          margin-top: 100px;
          margin-bottom: 40px;
          background-color: #ffffff;
          color: #333333;
          box-sizing: border-box;
        }
        h2 {
          margin-top: 0px;
          color: #4287f5;
          text-align: center;
          font-size: 1.2em;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        input, select, button {
          width: 100%;
          padding: 10px;
          margin-bottom: 0px;
          border: 1px solid #dddddd;
          border-radius: 5px;
          box-sizing: border-box;
        }
        button {
          background-color: #007bff;
          color: white;
          cursor: pointer;
          border: none;
        }
        button:hover {
          background-color: #0056b3;
        }
        p {
          text-align: center;
          font-size: 1.2em;
          color: lightgray
        }
      `;
    }

  static get properties() {
    return {
      fromCurrency: { type: String },
      toCurrency: { type: String },
      amount: { type: Number },
      result: { type: String },
    };
  }

  constructor() {
    super();
    this.fromCurrency = 'USD';
    this.toCurrency = 'EUR';
    this.amount = 1;
    this.result = '0';
  }

  async _fetchExchangeRate() {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${this.fromCurrency}&to=${this.toCurrency}&amount=${this.amount}`);
    const data = await response.json();
    return data.result;
  }

  async _handleFormSubmit(event) {
    event.preventDefault();
    const result = await this._fetchExchangeRate();
    this.result = result.toLocaleString(); // Convert the result to a string with commas
  }


  _handleAmountChange(event) {
    this.amount = event.target.value;
  }

  _handleFromCurrencyChange(event) {
    this.fromCurrency = event.target.value;
  }

  _handleToCurrencyChange(event) {
    this.toCurrency = event.target.value;
  }

  render() {
    return html`
      <h2>CURRENCY CONVERTER</h2>
      <form @submit=${this._handleFormSubmit}>
        <label for="amount">Amount:</label>
        <input id="amount" type="number" .value=${this.amount} @change=${this._handleAmountChange} required>

        <label for="fromCurrency">From:</label>
        <select id="fromCurrency" @change=${this._handleFromCurrencyChange}>
          <option value="USD" selected>USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="INR">INR</option>
          <option value="CNY">CNY</option>
        </select>

        <label for="toCurrency">To:</label>
        <select id="toCurrency" @change=${this._handleToCurrencyChange}>
          <option value="EUR" selected>EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="INR">INR</option>
          <option value="CNY">CNY</option>
        </select>

        <button type="submit">Convert</button>
      </form>

      <p>Result: ${this.result}</p>
    `;
  }
}

customElements.define('currency-widget', CurrencyWidget);
