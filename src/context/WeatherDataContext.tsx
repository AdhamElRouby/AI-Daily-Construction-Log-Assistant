/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

type WeatherDataContextType = {
  includeWeather: boolean;
  setIncludeWeather: React.Dispatch<React.SetStateAction<boolean>>;
};

const WeatherDataContext = createContext<WeatherDataContextType | null>(null);

type WeatherDataProviderProps = {
  children: ReactNode;
};

export const useWeatherData = () => {
  const context = useContext(WeatherDataContext);
  if (!context) {
    throw new Error('useWeatherData must be used within a WeatherDataProvider');
  }
  return context;
};

export const WeatherDataProvider = ({ children }: WeatherDataProviderProps) => {
  // State management for weather data
  // This context will handle whether to include weather data in the Gemini API call
  // and provide a way to toggle this state
  const [includeWeather, setIncludeWeather] = useState(false);

  return (
    <WeatherDataContext
      value={{
        includeWeather,
        setIncludeWeather,
      }}
    >
      {children}
    </WeatherDataContext>
  );
};
