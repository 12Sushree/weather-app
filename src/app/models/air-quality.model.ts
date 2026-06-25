export interface AirQualityResponse {
  list: {
    main: {
      aqi: number;
    };
  }[];
}
