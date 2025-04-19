'use client';
import Container from "@/components/Container";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import { Raleway } from "next/font/google";

const ralewayFont = Raleway({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-raleway',
});

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export default function Home() {

  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=santo%20tome&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  })

  if (isPending) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    )
  }

  const firstData = data?.list[0];
  console.log("data", data);
  
  const firstDataForEachDate = (() => {
    if (!data?.list) return [];
  
    const dateMap = new Map<string, any>();
  
    data.list.forEach((item) => {
      const entryDate = new Date(item.dt * 1000).toISOString().split('T')[0];
      const entryTime = new Date(item.dt * 1000).getHours();
  
      // Solo considerar entradas después de las 6:00 AM
      if (entryTime >= 6) {
        // Si no hay una entrada para esta fecha o la actual es más temprana, actualizar
        if (!dateMap.has(entryDate)) {
          dateMap.set(entryDate, item);
        }
      }
    });
  
    return Array.from(dateMap.values());
  })();

  return (
    <div className={`${ralewayFont.variable} flex flex-col gap-4 bg-gray-700 min-h-screen`}>
      <div className='font-main'>
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-8 w-full pb-10 pt-4 text-gray-300">
          {/* Today data */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
                <p>{format(parseISO(firstData?.dt_txt ?? ''), "EEEE")}</p>
                <p className="text-lg text-gray-400">{format(parseISO(firstData?.dt_txt ?? ''), "dd MMM yyyy")}</p>
              </h2>
              <Container className="gap-10 px-6 items-center">
                {/* Temperature */}
                <div className="flex flex-col px-4">
                  <span className="text-5xl">
                    {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                  </span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>Sensación térmica: </span>
                    <span>
                      {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                    </span>
                  </p>
                  <p className="text-xs space-x-2">
                    <span>
                      {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}° ↓
                    </span>
                    <span>
                      {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}° ↑
                    </span>
                  </p>
                </div>

                {/* Time and Weather icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between items-center gap-2 text-xs font-semibold">
                      <p className="text-gray-400 whitespace-nowrap">
                        {format(parseISO(item.dt_txt), 'HH:mm')}
                      </p>

                      <WeatherIcon 
                        iconname={getDayOrNightIcon(item.weather[0].icon, item.dt_txt)} 
                      />
                      <p>{convertKelvinToCelsius(item?.main.temp ?? 0)}°</p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
            <div className="flex gap-4">
              {/* Description of weather and icon */}
              <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="text-center capitalize">
                    {firstData?.weather[0].description}
                  </p>
                  <WeatherIcon 
                    iconname={getDayOrNightIcon(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')}
                  />
              </Container>
              {/* Weather Details */}
              <Container className="bg-yellow-500/50 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                    humidity={`${firstData?.main.humidity} %`}
                    windSpeed={`${convertWindSpeed(firstData?.wind.speed ?? 3.04)}`}
                    airPressure={`${firstData?.main.pressure} hPa`}
                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 1744971932), 'HH:mm')}
                    sunset={format(fromUnixTime(data?.city.sunset ?? 1745012323), 'HH:mm')}
                  />
              </Container>
            </div>
          </section>
          
          {/* 7 days forecast data */}
          <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">Pronóstico a 7 días</p>
            {firstDataForEachDate.map((item, index) => (
              <ForecastWeatherDetail 
                key={index}
                weatherIcon={item?.weather[0].icon ?? '01d'}
                description={item?.weather[0].description ?? ''}
                date={format(parseISO(item?.dt_txt ?? ''), 'dd MMM')}
                day={format(parseISO(item?.dt_txt ?? ''), 'EEEE')}
                temperature={item?.main.temp ?? 0}
                feels_like={item?.main.feels_like ?? 0}
                temp_min={item?.main.temp_min ?? 0}
                temp_max={item?.main.temp_max ?? 0}
                visibility={metersToKilometers(item?.visibility ?? 10000)}
                humidity={`${item?.main.humidity} %`}
                windSpeed={`${convertWindSpeed(item?.wind.speed ?? 3.04)}`}
                airPressure={`${item?.main.pressure} hPa`}
                sunrise={format(fromUnixTime(data?.city.sunrise ?? 1744971932), 'HH:mm')}
                sunset={format(fromUnixTime(data?.city.sunset ?? 1745012323), 'HH:mm')}
              />
            ))}        
          </section>
        </main>
      </div>
    </div>
  );
}
