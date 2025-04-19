import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import { WeatherDetailsProps } from './WeatherDetails';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

type Props = {}

export interface ForecastWeatherDetailProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {

  const {
    weatherIcon = '01d',
    date = '31 Dec 2025',
    day = 'Monday',
    temperature,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;

  return (
    <Container className='gap-4'>
      {/* Left section */}
      <section className='flex gap-4 items-center px-4'>
        {/* Weather icon and date */}
        <div>
          <WeatherIcon
            iconname={weatherIcon}
          />
          <p>{date}</p>
          <p className='text-sm'>{day}</p>
        </div>

        {/* Weather details */}
        <div className='flex flex-col px-4'>
          <span className='text-5xl'>{convertKelvinToCelsius(temperature ?? 0)}°</span>
          <p className='texst-xs space-x-1 whitespace-nowrap'>
            <span>Sensación térmica: </span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className='capitalize'>{description}</p>
        </div>
      </section>

      {/* Right section */}
      <section className='flex overflow-x-auto justify-between gap-4 px-4 w-full pr-10'>
        
      </section>
    </Container>
  )
}