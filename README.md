# Route Weather Checker

A React-based web application that helps users check weather conditions along their travel route. This project was developed entirely using GitHub Copilot as the AI pair programming assistant.

## Features

- Enter start and end destinations for your route
- Visualize your route on an interactive Google Map
- View weather conditions at various points along your journey
- Responsive design that works on both desktop and mobile devices

## Technologies Used

- React
- Google Maps API (@react-google-maps/api)
- Tailwind CSS for styling
- Weather API (integrated through weatherService)

## Setup

1. Clone the repository

```bash
git clone [https://github.com/ecsabanci/check-ur-route]
```

2. Install dependencies by running `npm install` or `yarn install`

3. Create a `.env` file in the root directory and add your API keys:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

4. Start the development server

```bash
npm start
```

5. Open your web browser and navigate to `http://localhost:3000` to view the application


## How It Works

The application combines Google Maps routing with weather data to provide users with weather information along their intended route:

1. Users input their start and end destinations
2. The app calculates the route using Google Maps API
3. Weather data is fetched for key points along the route
4. Both the route and weather information are displayed on an interactive map
5. A summary of weather conditions is shown alongside the map

## Project Structure

- `src/App.jsx` - Main application component
- `src/components/`
  - `RouteForm.jsx` - Handles user input for route selection
  - `WeatherMap.jsx` - Displays the map with route and weather data
  - `RouteWeatherSummary.jsx` - Shows weather information summary

## Development Notes

This project was developed using Cursor as the primary coding assistant, demonstrating the capabilities of AI-powered development tools in creating functional and well-structured applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
