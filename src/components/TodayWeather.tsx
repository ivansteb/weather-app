import React from 'react'
import Container from './Container';
import WeatherIcon from './WeatherIcon';
import WeatherDetails from './WeatherDetails';
import { format, fromUnixTime, parseISO } from 'date-fns';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';
import { metersToKilometers } from '@/utils/metersToKilometers';
import { convertWindSpeed } from '@/utils/convertWindSpeed';

type Props = {
    firstData: any;
    data: any;
}

export default function TodayWeather({ firstData, data }: Props) {
  return (
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
                {data?.list.map((item: any, index: number) => (
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
  )
}