/* eslint-disable react-refresh/only-export-components */
import { GoogleGenAI } from '@google/genai';
import { createContext, useContext, useState, type ReactNode } from 'react';
import generatePrompt from '../utils/generatePrompt';
import { useWeatherData } from './WeatherDataContext';
import useGetWeather, { type WeatherData } from '../hooks/useGetWeather';

type GeminiContextType = {
  loading: boolean;
  error: string;
  response: string;
  handleGeminiCall: (message: string) => Promise<void>;
};

const GeminiContext = createContext<GeminiContextType | null>(null);

type GeminiProviderProps = {
  children: ReactNode;
};

export const useGeminiCall = () => {
  const context = useContext(GeminiContext);
  if (!context) {
    throw new Error('useGemini must be used within a GeminiProvider');
  }
  return context;
};

export const GeminiProvider = ({ children }: GeminiProviderProps) => {
  // State management for Gemini API calls
  // This context will handle the loading state, error messages, and responses from the Gemini API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const { includeWeather } = useWeatherData();
  const { handleGetWeather } = useGetWeather();

  const handleGeminiCall = async (message: string) => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      let weatherData: WeatherData | null = null;
      if (includeWeather) {
        weatherData = await handleGetWeather();
      }
      const promptMessage = generatePrompt(message, weatherData);
      const client = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });
      const res = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptMessage,
      });
      console.log('Gemini API response:', res.text);
      setResponse(res.text || '');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeminiContext
      value={{
        loading,
        error,
        response,
        handleGeminiCall,
      }}
    >
      {children}
    </GeminiContext>
  );
};
