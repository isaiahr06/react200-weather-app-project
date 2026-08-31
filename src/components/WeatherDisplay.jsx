import useWeather from '../hooks/useWeather';

const WeatherDisplay = () => {
  const { data, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-md">
        <p className="text-gray-600">
          Loading weather...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-md">
        <p className="text-red-600">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-md">
        <p className="text-gray-500">
          Please search for a city to display weather data.
        </p>
      </div>
    );
  }

  const weatherDescription = data.weather?.[0]?.description;
  const weatherIcon = data.weather?.[0]?.icon;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {data.name}
            {data.sys?.country && `, ${data.sys.country}`}
          </h2>

          <p className="mt-1 capitalize text-gray-500">
            {weatherDescription}
          </p>
        </div>

        {weatherIcon && (
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={weatherDescription || 'Weather icon'}
            className="h-20 w-20"
          />
        )}
      </div>

      <div className="my-8 text-center">
        <p className="text-6xl font-bold text-blue-600">
          {Math.round(data.main?.temp)}°F
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">
            Feels Like
          </p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            {Math.round(data.main?.feels_like)}°F
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">
            Humidity
          </p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            {data.main?.humidity}%
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">
            Wind Speed
          </p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            {data.wind?.speed} mph
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;