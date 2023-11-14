import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/individual-widget/weather-widget.js';
import './components/individual-widget/currency-widget.js';


class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-image: url('./background.jpg');
      background-size:cover;
      background-repeat:no-repeat;
    }

    header h1 {
      color:lightgray;
    }

    login-widget{
      color:lightgray
    }

    main {
      display: flex;
      justify-content: center;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
      margin-top:100px
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 PORTAL';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>
        <widget-column header="WIDGETS">
        <weather-widget></weather-widget>
        <widget-block header=""> 
        <random-widget></random-widget>
        </widget-block>
        </widget-column>
        <blog-block></blog-block>       
        <widget-column header="WIDGETS">
          <ad-widget></ad-widget>
          <widget-block header=""> 
          <widget-block header="fifth widget"></widget-block>
          </widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal);