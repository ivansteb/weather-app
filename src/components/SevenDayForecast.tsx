import React from 'react'
import ForecastWeatherDetail from './ForecastWeatherDetail';
import { format, fromUnixTime, parseISO } from 'date-fns';
import { metersToKilometers } from '@/utils/metersToKilometers';
import { convertWindSpeed } from '@/utils/convertWindSpeed';

type Props = {
    firstDataForEachDate: any[];
    data: any;
}

export default function SevenDayForecast({ firstDataForEachDate, data }: Props) {
    return (
        <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">Pronóstico a 7 días</p>
            {firstDataForEachDate.map((item: any, index: number) => (
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
    )
}