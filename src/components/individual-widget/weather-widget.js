import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WeatherWidget extends LitElement {

    static get styles() {//adding styles to the widget
        return css`
          :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 250px;
            height: 250px;
            background: linear-gradient(to right,#f5f5f5, #8ec5fc);
            border-radius: 15px;
            margin-bottom:100px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            color: #333;
          }
          img {
            width: 55px;
            height: 55px;
            margin-bottom: 1px;
            
          }
        `;
      }

    static get properties() {//defining the properties for weather widget
        return {
            longitude: { type: Number },
            latitude: { type: Number },
            weatherInfo: { type: Object },
            isLoading: { type: Boolean },
            city: { type: String },
        };
    }

    constructor() {
        super();
        this.longitude = null;
        this.latitude = null;
        this.weatherInfo = null;
        this.isLoading = false;
        this.city = 'Sydney';
    }

    connectedCallback() {
        super.connectedCallback();
        this.getLocation();
    }
    //Accessing the location for the weather data
    async getLocation() {
        try {
            const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
            this.longitude = position.coords.longitude;
            this.latitude = position.coords.latitude;
            await this.getWeatherInfo();
        } catch (error) {
            console.error(error);
        }
    }
    //getting weather data depend on the location 
    async getWeatherInfo() {
        try {
        this.isLoading = true;
        const API_KEY = 'DHX7HX9SWQBUKXT7AKBTWF5QJ';
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.latitude},${this.longitude}?unitGroup=metric&key=${API_KEY}&contentType=json`);
        const data = await response.json();
        this.weatherInfo = data;
        } catch (error) {
        console.error(error);
        } finally {
        this.isLoading = false;
        }
    }

    getCity(fullAddress) {
        const city = fullAddress.split(',')[0].trim();
        return city;
    }
    

    render() {
        if (this.isLoading || !this.weatherInfo) {
        return html`<div>fetching weather data...</div>`;
        }

        const { temp, conditions} = this.weatherInfo.currentConditions;

        return html`
            <div>
               <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/7913380/weather-icon-md.png" alt="weather icon" alt="weather icon">
               <h2>${this.city}</h2>
               <h3>Current Weather</h3>
               <p>${conditions}</p> 
               <p>Temperature: ${temp} &#8451;</p>
            </div>
        `;
    }
}
customElements.define('weather-widget', WeatherWidget);
