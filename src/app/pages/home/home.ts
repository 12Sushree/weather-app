import { DatePipe, DecimalPipe } from '@angular/common';
import { SearchBar } from '../../components/search-bar/search-bar';
import { WeatherCard } from '../../components/weather-card/weather-card';
import { ForecastResponse } from '../../models/forecast.model';
import { WeatherResponse } from '../../models/weather.model';
import { Weather } from './../../services/weather';
import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { AirQualityResponse } from '../../models/air-quality.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBar, WeatherCard, DatePipe, DecimalPipe],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  weatherData = signal<WeatherResponse | null>(null);
  loading = signal(false);
  searchHistory = signal<string[]>(JSON.parse(localStorage.getItem('history') ?? '[]'));
  forecastData = signal<ForecastResponse | null>(null);
  errorMessage = signal('');
  darkMode = signal(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));
  airQuality = signal<AirQualityResponse | null>(null);

  hasWeather = computed(() => this.weatherData() !== null);
  forecastItems = computed(() => {
    const forecast = this.forecastData();
    if (!forecast) {
      return [];
    }
    const dailyForecasts = forecast.list.filter((item) => item.dt_txt.includes('12:00:00'));
    return dailyForecasts.slice(0, 5);
  });
  backgroundClass = computed(() => {
    const weather = this.weatherData();
    if (!weather) {
      return 'from-sky-400 via-blue-500 to-indigo-600';
    }
    const condition = weather.weather[0].main;
    switch (condition) {
      case 'Clear':
        return 'from-yellow-300 via-orange-400 to-pink-500';
      case 'Clouds':
        return 'from-gray-400 via-gray-500 to-gray-700';
      case 'Rain':
      case 'Drizzle':
        return 'from-slate-500 via-blue-700 to-slate-900';
      case 'Thunderstorm':
        return 'from-gray-800 via-slate-900 to-black';
      case 'Snow':
        return 'from-cyan-100 via-blue-200 to-slate-300';
      default:
        return 'from-sky-400 via-blue-500 to-indigo-600';
    }
  });
  pageClasses = computed(() => {
    if (this.darkMode()) {
      return 'bg-gray-900 text-white';
    }
    return `bg-gradient-to-br ${this.backgroundClass()}`;
  });
  weatherEmoji = computed(() => {
    const weather = this.weatherData();
    if (!weather) {
      return '🌤';
    }
    switch (weather.weather[0].main) {
      case 'Clear':
        return '☀';
      case 'Clouds':
        return '☁';
      case 'Rain':
        return '🌧';
      case 'Thunderstorm':
        return '⛈';
      case 'Snow':
        return '❄';
      default:
        return '🌤';
    }
  });
  aqiStatus = computed(() => {
    const aqi = this.airQuality()?.list[0]?.main.aqi;
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  });
  aqiEmoji = computed(() => {
    const aqi = this.airQuality()?.list[0]?.main.aqi;
    switch (aqi) {
      case 1:
        return '🟢';
      case 2:
        return '🟡';
      case 3:
        return '🟠';
      case 4:
        return '🔴';
      case 5:
        return '⚫';
      default:
        return '⚪';
    }
  });

  constructor(private weatherService: Weather) {
    effect(() => {
      localStorage.setItem('history', JSON.stringify(this.searchHistory()));
    });

    effect(() => {
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('history');

    if (saved && saved === 'undefined') {
      this.searchHistory.set(JSON.parse(saved));
    }
  }

  getWeather(city: string) {
    this.loading.set(true);
    this.errorMessage.set('');

    this.weatherService.getWeather(city).subscribe({
      next: (weather) => {
        this.weatherData.set(weather);

        const lat = weather.coord.lat;
        const lon = weather.coord.lon;

        this.weatherService.getForecast(city).subscribe({
          next: (forecast) => {
            this.forecastData.set(forecast);
            this.loading.set(false);
          },
          error: () => {
            this.loading.set(false);
            this.errorMessage.set('Forecast not available');
          },
        });

        this.weatherService.getAirQuality(lat, lon).subscribe({
          next: (aqi) => {
            this.airQuality.set(aqi);
          },
        });
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('City not found');
      },
    });

    if (!this.searchHistory().includes(city)) {
      this.searchHistory.update((history) => [city, ...history]);
    }
  }

  getCurrentLocation() {
    this.loading.set(true);
    this.errorMessage.set('');

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.weatherService.getWeatherByCoords(lat, lon).subscribe({
        next: (data) => {
          this.weatherData.set(data);

          this.weatherService.getForecastByCoords(lat, lon).subscribe({
            next: (forecast) => {
              this.forecastData.set(forecast);
              this.loading.set(false);
            },
            error: () => {
              this.loading.set(false);
              this.errorMessage.set('Forecast not available');
            },
          });
        },
        error: () => {
          this.errorMessage.set('Location weather not available');
          this.loading.set(false);
        },
      });

      this.weatherService.getAirQuality(lat, lon).subscribe({
        next: (aqi) => {
          this.airQuality.set(aqi);
        },
      });
    });
  }

  toggleDarkMode() {
    this.darkMode.update((mode) => !mode);
  }
}
