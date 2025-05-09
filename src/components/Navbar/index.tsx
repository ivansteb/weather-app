'use client'
import React, { useState } from 'react'
import { MdMyLocation, MdWbSunny } from 'react-icons/md'
import { SlLocationPin } from 'react-icons/sl'
import SearchBox from '../SearchBox'
import axios from 'axios'
import { useAtom } from 'jotai'
import { loadingCityAtom, placeAtom } from '@/app/atom'
import SuggestionBox from './SuggestionBox'

type Props = { location?: string };

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {

    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [place, setPlace] = useAtom(placeAtom);
    const [_, setLoadingCity] = useAtom(loadingCityAtom);

    async function handleInputChange(value: string) {
        setCity(value);
        if (value.length > 0) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
                );
                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setError("");
                setShowSuggestions(true);
            } catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
    }

    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
        setLoadingCity(true);

        e.preventDefault();
        if (suggestions.length == 0) {
            setError("No suggestions found");
            setLoadingCity(false);
        } else {
            setError("");
            setTimeout(() => {
                setLoadingCity(false);
                setPlace(city);
                setShowSuggestions(false);
            }, 300);
        }
    }

    function handleCurrentLocation() {
        setLoadingCity(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
                    );
                    setTimeout(() => {
                        setLoadingCity(false);
                        setPlace(response.data.name);
                    }, 300);
                } catch (error) {
                    setLoadingCity(false);
                    setError("Unable to fetch location data");
                }
            })
        }
    }

    return (
        <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
                <div className='flex items-center justify-center gap-2'>
                    <h2 className='text-gray-500 text-3xl font-bold'>Weather</h2>
                    <MdWbSunny className='text-3xl mt-1 text-yellow-400' />
                </div>
                <div className='flex gap-4 items-center'>
                    <p className='text-slate-900/80 text-sm'>{location}</p>
                    <MdMyLocation 
                        title="Current location"
                        onClick={handleCurrentLocation}
                        className='text-2xl text-gray-500 hover:opacity-80 cursor-pointer' 
                    />
                    <SlLocationPin className='text-3xl text-gray-500 hover:opacity-80 cursor-pointer' />
                    <div className='relative'>
                        {/* Search box */}
                        <SearchBox 
                            value={city}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onSubmit={handleSubmitSearch}
                        />
                        <SuggestionBox 
                            {...{
                                suggestions,
                                showSuggestions,
                                handleSuggestionClick,
                                error
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}