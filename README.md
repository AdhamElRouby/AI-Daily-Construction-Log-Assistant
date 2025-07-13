# AI Daily Log Assistant
An AI-powered web app that helps construction teams generate structured daily log reports from natural language inputs. Built with React.js and powered by the Gemini API, the tool streamlines documentation, enhances productivity, and ensures consistent record-keeping across construction projects.

## Tech Stack
- <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=white&style=flat" alt="html5">
- <img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3&logoColor=white&style=flat" alt="css3">
- <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=white&style=flat" alt="TypeScript">
- <img src="https://img.shields.io/badge/-React-61DAFB?logo=React&logoColor=black&style=flat" alt="React.js">



## Problem Statement
Every day during construction, site supervisors take rough daily notes (weather, work done, issues) that later need to be compiled into a formal report for communication and ease of use. However, this process is highly inefficient because it takes a lot of time, which may cause delays or miscommunication, affecting the whole construction process. There should be an AI agent that automates the conversion of scattered notes into a structured format that eases communication between project managers and field engineers.

**Who Gets Affected:**

- **Construction Supervisors**: have to format everything at the end of the day, which is time-consuming and inefficient.  
- **Project Managers**: depend on daily logs for decision-making and coordination. Late or unclear logs slow down the project and increase risk.

## Run Locally

Instead of running locally, you can try the web app online [here](https://edecs-assessment-ai-daily-log-assis.vercel.app/).

Clone the project

```bash
  git clone https://github.com/AdhamElRouby/edecs-assessment-ai-daily-log-assistant.git
```

Go to the project directory

```bash
  cd .\edecs-assessment-ai-daily-log-assistant
```

Open with VSCode

```bash
  code .
```

Install dependencies

```bash
  npm install
```

Open with live server

```bash
  npm run dev
```

**Note:**  
To quickly try out the AI assistant, you can copy one of the sample inputs from the `src/examples` folder and paste it into the input box on the main page.


## Key Design Choices & Features

### 🚀 Features
- Users can input unstructured notes and optionally choose to include the current weather.
- Generated summaries can be exported as a PDF.

### 🧠 Key Design Choices
- The app is structured around two main components:  
  - **Form Component**: Handles user input and includes the `WeatherToggleSwitch` component.  
  - **Summary Component**: Displays the LLM response and uses the `MarkdownParser` component to render the content.
  
- **Material UI** was used for building a modern and ineractive UI quickly.
- **TypeScript** ensures safe typing and better development experience.
- **Global State Management** is handled using React's `useContext()` API via two contexts:  
  - `GeminiContext`: Manages loading states, error messages, and Gemini API responses.  
  - `WeatherDataContext`: Manages whether to include weather data and allows toggling this option.

- **Gemini API (gemini-2.5-flash free model)** is used to generate structured summaries from unstructured input.
- **Geolocation API** and **OpenWeatherMap API** are used in the custom hook `useGetWeather` to get the user’s current weather.
- **react-markdown** parses the Gemini response (in Markdown) into rendered HTML.
- **html2pdf.js** is used to export the final summary as a downloadable PDF.
- The sample notes in the `src/examples` folder were AI-generated using ChatGPT.


## Limitations & Extensibility

### ⚠️ Limitations

- The weather data is based on the user's current location, which may differ from the actual construction site.
- The app only accepts plain text input; users cannot upload documents (e.g., PDFs) for parsing.
- The free Gemini 2.5-flash model was used. While effective, higher-tier models could improve summarization quality.
- Users cannot customize the structure or format of the generated summary — more flexibility is needed.
- The UI is not fully responsive across all screen sizes and should be improved for mobile use.
- There’s no caching or history — identical requests are reprocessed from scratch.
- The Gemini API key is exposed in the frontend code, posing a security risk.
- No progress indicators are shown during API calls (e.g., weather fetching → Gemini request), making the experience less transparent.

### 🔧 Extensibility Ideas

- Multi-model support: Allow switching between Gemini and other LLMs (e.g., GPT).
- Response streaming: Show summaries as they’re being generated, for a more dynamic UX.
- Conversation history: Maintain context across multiple entries for better continuity.
- Prompt customization: Let users define their own prompt templates or summary formats.
- Advanced weather handling: Allow manual location selection or support multiple weather APIs.
- Calendar integration: Sync with construction schedules to enrich the daily logs.
- Multi-input support: Accept and parse PDFs, images, or even voice notes for wider usability.

