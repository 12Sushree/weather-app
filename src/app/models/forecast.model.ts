export interface ForecastResponse {
  list: ForecastItem[];
}

export interface ForecastItem {
  dt: number;

  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  dt_txt: string;
}
