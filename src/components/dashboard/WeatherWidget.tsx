'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  pressure: number;
  wind: number;
  humidity: number;
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    async function fetchWeather() {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      if (!apiKey || apiKey === 'your_openweathermap_api_key') {
        setData({
          temp: 24,
          condition: 'Heavy rain',
          pressure: 1010,
          wind: 3.7,
          humidity: 83,
        });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Ramagundam&units=metric&appid=${apiKey}`
        );
        const json = await res.json();

        if (json?.main) {
          let mainCondition = 'Heavy rain';
          if (json.weather?.[0]?.main) {
            const apiStatus = json.weather[0].main.toLowerCase();
            if (apiStatus.includes('cloud')) mainCondition = 'Cloudy';
            else if (apiStatus.includes('clear')) mainCondition = 'Sunny';
            else if (apiStatus.includes('rain') || apiStatus.includes('drizzle') || apiStatus.includes('thunderstorm')) mainCondition = 'Heavy rain';
            else if (apiStatus.includes('mist') || apiStatus.includes('haze') || apiStatus.includes('fog')) mainCondition = 'Misty';
            else mainCondition = json.weather[0].main;
          }

          setData({
            temp: Math.round(json.main.temp),
            condition: mainCondition,
            pressure: json.main.pressure,
            wind: Number((json.wind.speed * 3.6).toFixed(1)),
            humidity: json.main.humidity,
          });
        } else {
          throw new Error();
        }
      } catch {
        setData({
          temp: 24,
          condition: 'Heavy rain',
          pressure: 1010,
          wind: 3.7,
          humidity: 83,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    return () => clearInterval(timer);
  }, []);

  if (loading || !currentTime) {
    return (
      <div className="bg-[#10142E] rounded-3xl h-[170px] animate-pulse border border-zinc-800" />
    );
  }

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).toUpperCase();
  };

  const getWeatherIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('thunderstorm')) {
      return (
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
          <path d="M8 19v2" />
          <path d="M12 21v2" />
          <path d="M16 19v2" />
        </svg>
      );
    }
    if (cond.includes('cloud')) {
      return (
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 0 0-5 5v1a4 4 0 0 0-4 4 4 4 0 0 0 4 4h10a5 5 0 0 0 5-5 5 5 0 0 0-5-5H12z" />
        </svg>
      );
    }
    return (
      <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    );
  };

  return (
    <div className="bg-[#10142E] rounded-3xl text-white overflow-hidden flex flex-col h-[170px] select-none border border-zinc-800/50">
      <div className="bg-[#FF4E98] py-2.5 px-6 flex justify-between items-center text-lg font-bold tracking-wider font-mono">
        <span>{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>

      <div className="flex-grow grid grid-cols-3 items-center px-4 py-2">
        <div className="flex flex-col items-center justify-center space-y-1">
          {getWeatherIcon(data?.condition || '')}
          <span className="text-xs font-semibold tracking-wide text-zinc-300">
            {data?.condition}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center border-r border-white/10 h-4/5 pr-2">
          <h2 className="text-4xl font-normal tracking-tight font-sans">
            {data?.temp}°C
          </h2>
          <div className="flex items-center gap-1 mt-1 opacity-70">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
            </svg>
            <span className="text-[9px] uppercase tracking-wider font-medium whitespace-nowrap">
              {data?.pressure} mbar Pressure
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center pl-4 space-y-3 text-[10px] uppercase tracking-wider font-semibold text-zinc-300">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2" />
            </svg>
            <div>
              <p className="text-white font-bold">{data?.wind} km/h</p>
              <p className="text-[8px] opacity-60 lowercase">Wind</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <div>
              <p className="text-white font-bold">{data?.humidity}%</p>
              <p className="text-[8px] opacity-60 lowercase">Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}