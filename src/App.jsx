import { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import useWeather from './hooks/useWeather';
import { WeatherProvider } from './context/WeatherContext';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const { fetchWeather, loading } = useWeather();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-10">
      <main className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Current Weather
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Weather App
          </h1>

          <p className="mt-3 text-gray-600">
            Search for a city to view its current weather.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter a city..."
            aria-label="City"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <WeatherDisplay />
      </main>
    </div>
  );
};

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;