export interface WeatherResponse {
  name: string;

  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  wind: {
    speed: number;
  };

  visibility: number;

  sys: {
    sunrise: number;
    sunset: number;
  };

  coord: {
    lat: number;
    lon: number;
  };
}
