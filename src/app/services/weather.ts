import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherResponse } from '../models/weather.model';
import { ForecastResponse } from '../models/forecast.model';
import { AirQualityResponse } from '../models/air-quality.model';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get<WeatherResponse>(
      `${environment.apiUrl}/weather?q=${city}&appid=${environment.apiKey}&units=metric`,
    );
  }

  getForecast(city: string) {
    return this.http.get<ForecastResponse>(
      `${environment.apiUrl}/forecast?q=${city}&appid=${environment.apiKey}&units=metric`,
    );
  }

  getWeatherByCoords(lat: number, lon: number) {
    return this.http.get<WeatherResponse>(
      `${environment.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.apiKey}&units=metric`,
    );
  }

  getForecastByCoords(lat: number, lon: number) {
    return this.http.get<ForecastResponse>(
      `${environment.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${environment.apiKey}&units=metric`,
    );
  }

  getAirQuality(lat: number, lon: number) {
    return this.http.get<AirQualityResponse>(
      `${environment.apiUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`,
    );
  }
}
