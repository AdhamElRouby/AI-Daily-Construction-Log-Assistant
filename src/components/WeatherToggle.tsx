import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useWeatherData } from '../context/WeatherDataContext';

export default function WeatherToggle() {
  // WeatherToggle component to toggle the inclusion of weather data in the Gemini API call
  // It uses a switch to toggle the state and updates the context accordingly
  const { includeWeather, setIncludeWeather } = useWeatherData();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={includeWeather}
          onChange={() => setIncludeWeather(!includeWeather)}
          color="primary"
        />
      }
      label={includeWeather ? 'Weather Included' : 'Weather Excluded'}
    />
  );
}
