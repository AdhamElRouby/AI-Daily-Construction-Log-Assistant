import { type WeatherData } from "../hooks/useGetWeather";

const generatePrompt = (
  message: string,
  weatherData?: WeatherData | null
): string => {
  let weatherSection = '';

  if (weatherData) {
    weatherSection = `
        🌤️ Weather Conditions
          - Temperature: ${weatherData.temp}°C
          - Humidity: ${weatherData.humidity}%
          - Conditions: ${weatherData.status} - ${weatherData.description}
          - Location: ${weatherData.location}
        `;
  }

  return `You are an AI assistant helping construction site supervisors summarize and log daily reports.
        You will receive a raw, unstructured description of the day written by a supervisor. This message may include updates about site progress, equipment, incidents, and delays.
        Your task is to generate a clean, professional **markdown report** based on the input.
        Include the following sections in the markdown:

        # Daily Report Summary
        1. 📅 Date  
          - Detect from the message if mentioned. If not found, write: Not Determined.

        2. 📍 Site Name / Location  
          - Mention if provided. If not, write: Not Determined.

        3. ✅ Work Progress
          - Summarize completed tasks, milestones, or phases.

        4. ⚠️ Issues or Delays  
          - Summarize any reported blockers, errors, or delays.

        5. 🧰 Equipment Usage  
          - List key machinery or resources used or idle.

        6. 🚧 Safety Notes  
          - Mention any safety incidents, near-misses, or related concerns.
        ${
          weatherSection
            ? `
        7.${weatherSection}\n(weather section is very important to add it)`
            : ''
        }
        ---
        If a section has no relevant information, write **"No updates"**.
        Don't add '--' at the start or end of the report.

        ### Input Message:
        ${message}`;
};

export default generatePrompt;
