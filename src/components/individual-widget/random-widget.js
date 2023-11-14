import { LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class DateFactWidget extends LitElement {
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
      p {
        text-align: center;
        font-size: 1.2em;
      }
    `;
  }

  static get properties() {
    return {
      dateFact: { type: String },
    };
  }

  constructor() {
    super();
    this.dateFact = 'Loading...';
    this.getDateFact();
  }

  async getDateFact() {
    const today = new Date();
    const month = today.getMonth() + 1; // Month count starts at 0
    const day = today.getDate();
    const response = await fetch(`http://numbersapi.com/${month}/${day}/date`);
    this.dateFact = await response.text();
  }

  render() {
    return html`
      <h2>TODAY'S FACT</h2>
      <p>${this.dateFact}</p>
    `;
  }
}

customElements.define('date-fact-widget', DateFactWidget);
