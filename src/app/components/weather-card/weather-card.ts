import { Component, Input } from '@angular/core';
import { WeatherResponse } from '../../models/weather.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './weather-card.html',
})
export class WeatherCard {
  @Input()
  weather!: WeatherResponse;
}
