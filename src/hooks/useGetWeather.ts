import { useWeatherData } from '../context/WeatherDataContext';
import { errorNotify } from '../utils/errorNotify';

export type WeatherData = {
  temp: number;
  humidity: number;
  status: string;
  description: string;
  location: string;
};

// OpenWeatherMap API response type
interface OpenWeatherMapResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
}

const useGetWeather = () => {
  const { setIncludeWeather } = useWeatherData();

  const handleGetWeather = async () => {
    try {
      // get user's current position
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`;

      // fetch weather data from OpenWeatherMap API
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data: OpenWeatherMapResponse = await response.json();
      const {
        main: { temp, humidity },
        weather: [{ main: status, description }],
        name: location,
      } = data;

      const weatherInfo: WeatherData = {
        temp,
        humidity,
        status,
        description,
        location,
      };
      setIncludeWeather(true);
      // return the weather data
      return weatherInfo;
    } catch (error) {
      console.error('Weather fetch error:', error);
      setIncludeWeather(false);
      errorNotify(
        'Failed to fetch weather data. Please try again later.'
      );
      return null;
    }
  };

  return { handleGetWeather };
};

export default useGetWeather;
