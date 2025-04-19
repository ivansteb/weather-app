import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

type Props = {}

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
    const {
        visibility = '25km',
        humidity = '60%',
        windSpeed = '15km/h',
        airPressure = '1013hPa',
        sunrise = '6:00',
        sunset = '18:00'
    } = props;
  
    return (
    <>
        <SingleWeatherDetail
            information='Visibilidad'
            icon={<LuEye />}
            value={props.visibility}
        />
        <SingleWeatherDetail
            information='Humedad'
            icon={<FiDroplet />}
            value={props.humidity}
        />
        <SingleWeatherDetail
            information='Velocidad del viento'
            icon={<MdAir />}
            value={props.windSpeed}
        />
        <SingleWeatherDetail
            information='Presión del aire'
            icon={<ImMeter />}
            value={props.airPressure}
        />
        <SingleWeatherDetail
            information='Amanecer'
            icon={<LuSunrise />}
            value={sunrise}
        />
        <SingleWeatherDetail
            information='Atardecer'
            icon={<LuSunset />}
            value={sunset}
        />
    </>
  )
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail (props: SingleWeatherDetailProps) {
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-slate/60'>
            <p className='whitespace-nowrap'>{props.information}</p>
            <div className='text-3xl'>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}