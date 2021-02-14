
import { IHttpClient } from "aurelia";

export class Fetchdata {
	constructor(@IHttpClient readonly http: IHttpClient) {
	}

	forecasts: IWeatherForecast[];

	async load() {
		this.forecasts = await this.http.fetch("/WeatherForecast").then(result => result.json() as Promise<IWeatherForecast[]>);
	}
}

interface IWeatherForecast {
	date: string;
	temperatureC: number;
	temperatureF: number;
	summary: string;
}
