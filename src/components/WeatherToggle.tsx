import Switch from '@mui/material/Switch';
import { Box, Chip } from '@mui/material';
import { WbSunny, CloudOff } from '@mui/icons-material';
import { useWeatherData } from '../context/WeatherDataContext';

export default function WeatherToggle() {
  // WeatherToggle component to toggle the inclusion of weather data in the Gemini API call
  // It uses a switch to toggle the state and updates the context accordingly
  const { includeWeather, setIncludeWeather } = useWeatherData();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        icon={includeWeather ? <WbSunny /> : <CloudOff />}
        label={includeWeather ? 'Weather Included' : 'Weather Excluded'}
        variant={includeWeather ? 'filled' : 'outlined'}
        sx={{
          background: includeWeather
            ? 'linear-gradient(45deg, #ffa726, #ff7043)'
            : 'transparent',
          color: includeWeather ? 'white' : '#666',
          borderColor: includeWeather ? 'transparent' : '#ddd',
          fontWeight: 500,
          '& .MuiChip-icon': {
            color: includeWeather ? 'white' : '#ffa726',
          },
        }}
      />
      <Switch
        checked={includeWeather}
        onChange={() => setIncludeWeather(!includeWeather)}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#ffa726',
            '&:hover': {
              backgroundColor: 'rgba(255, 167, 38, 0.08)',
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            background: 'linear-gradient(45deg, #ffa726, #ff7043)',
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#ddd',
          },
        }}
      />
    </Box>
  );
}
