# 🌤 Weather App

A modern Weather Application built with **Angular 21**, **Signals**, **Tailwind CSS**, and the **OpenWeather API**.

The application allows users to search weather information for any city, view a 5-day forecast, use their current location, switch between dark and light themes, and view air quality information.

## 🚀 Features

### 🌍 Weather Search

- Search weather by city name
- Real-time weather information
- Error handling for invalid cities

### 📍 Current Location Weather

- Uses the browser Geolocation API
- Fetches weather based on the user's current location

### 📅 5-Day Forecast

- Displays upcoming daily forecasts
- Weather icons and descriptions
- Temperature predictions

### 🌫 Air Quality Index (AQI)

- Displays air quality information
- AQI status indicators:
  - 🟢 Good
  - 🟡 Fair
  - 🟠 Moderate
  - 🔴 Poor
  - ⚫ Very Poor

### 🌅 Additional Weather Details

- Sunrise Time
- Sunset Time
- Visibility
- Humidity
- Wind Speed
- Pressure
- Feels Like Temperature

### 🌙 Dark Mode

- Light/Dark theme toggle
- Theme preference persists after refresh

### 🕒 Search History

- Stores previously searched cities
- Persisted using Local Storage
- Quick access to recent searches

### ⚡ Modern Angular Features

- Angular Standalone Components
- Angular Signals
- Computed Signals
- Effects
- Angular Control Flow (`@if`, `@for`)
- TypeScript Interfaces

## 🛠 Tech Stack

| Technology      | Purpose                  |
| --------------- | ------------------------ |
| Angular 21      | Frontend Framework       |
| TypeScript      | Application Logic        |
| Tailwind CSS    | Styling                  |
| Angular Signals | State Management         |
| OpenWeather API | Weather Data             |
| Local Storage   | Data Persistence         |
| Geolocation API | Current Location Weather |

## 📂 Project Structure

```text
src/
│
├── app/
│   │
│   ├── components/
│   │   ├── search-bar/
│   │   └── weather-card/
│   │
│   ├── pages/
│   │   └── home/
│   │
│   ├── models/
│   │   ├── weather.model.ts
│   │   ├── forecast.model.ts
│   │   └── air-quality.model.ts
│   │
│   └── services/
│       └── weather.ts
│
├── environments/
│   └── environment.ts
│
└── main.ts
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-app.git
```

### 2. Navigate to Project

```bash
cd weather-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create:

```text
src/environments/environment.ts
```

```ts
export const environment = {
  apiUrl: 'https://api.openweathermap.org/data/2.5',
  apiKey: 'YOUR_OPENWEATHER_API_KEY',
};
```

## 🔑 Getting OpenWeather API Key

1. Create an account at:
   https://openweathermap.org

2. Navigate to:
   https://home.openweathermap.org/api_keys

3. Generate an API key

4. Replace:

```ts
YOUR_OPENWEATHER_API_KEY;
```

with your actual API key.

## ▶️ Running the Application

Start the development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

## 🧠 Angular Concepts Practiced

- Standalone Components
- Component Communication
- Input & Output Decorators
- Angular Signals
- Computed Signals
- Effects
- Dependency Injection
- HTTP Client
- Services
- TypeScript Models
- Angular Pipes
- Geolocation API
- Local Storage Persistence
- Tailwind CSS Styling

## 🔮 Future Enhancements

- ⭐ Favorite Cities
- 📊 Hourly Forecast
- 🌎 Multiple Language Support
- 📱 Progressive Web App (PWA)
- 🔔 Weather Alerts
- 🗺 Interactive Weather Maps
- 📈 Weather Charts
- 🌬 Detailed Air Pollution Metrics

## 👨‍💻 Author

Developed by Sushreeta Sahu

GitHub:
https://github.com/12Sushree
