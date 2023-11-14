import { LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
//Random facts widget
class RandomFact extends LitElement {
    static properties = {
        header: {type: String},
        fact: {type: String}
    };

    static styles = css`  
    :host {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content:center; 
        padding: 10px; 
    }
    h3{ 
        margin: 0; 
    }
    p{
        margin: 5px 0;
    }
    #btn{
        background-color: #abdbe3; 
        color: white; 
        font-size: 16px; 
        border: none; 
        border-radius: 5px; 
        padding: 10px 20px; 
        cursor: pointer;
        margin-top: 10px;
    }
    #btn:hover{
        background-color: #1e81b0; 
    }
    `; 

    constructor(){
        super(); 
        this.header = 'Fact of the Day'; 
        this.fact = ','; 
    }
    connectedCallback(){
        super.connectedCallback(); 
        this.fetchFact();
    }
    fetchFact(){
        const now = new Date(); 
        const month = now.getMonth() + 1; 
        const day = now.getDate(); 
        const url = `http://numbersapi.com/${month}/${day}/date`; 

        fetch(url)
        .then(response => response.text())
        .then(data => {
            this.fact = data; 
            this.requestUpdate(); 
        });
    }
    render(){
        return html`
        <h3>${this.header}</h3>
        <p>${this.fact}</p>
        `;
    }
}

customElements.define('random fact', RandomFact); 
