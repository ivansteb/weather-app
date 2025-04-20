'use client'
import React, { useState } from 'react'
import { MdMyLocation, MdWbSunny } from 'react-icons/md'
import { SlLocationPin } from 'react-icons/sl'
import SearchBox from './SearchBox'
import axios from 'axios'

type Props = {}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({}: Props) {

    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    async function handleInputChange(value: string) {
        setCity(value);
        if (value.length > 0) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.API_KEY}`
                );
                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setShowSuggestions(true);
                setError(false);
            } catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
                setError("No suggestions found");
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setError("No suggestions found");
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
    }

    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (suggestions.length == 0) {
            setError("No suggestions found");
            return;
        } else {
            setError("");
            setShowSuggestions(false);
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
                <MdMyLocation className='text-2xl text-gray-500 hover:opacity-80 cursor-pointer' />
                <SlLocationPin className='text-3xl text-gray-500 hover:opacity-80 cursor-pointer' />
                <p className='text-slate-900/80 text-sm'>Santo Tomé</p>
                <div className='relative'>
                    <SearchBox 
                        value={city}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onSubmit={(e) => handleSubmitSearch(e)}
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

function SuggestionBox({
    suggestions,
    showSuggestions,
    handleSuggestionClick,
    error
}: {
    suggestions: string[],
    showSuggestions: boolean,
    handleSuggestionClick: (suggestion: string) => void,
    error: string
}) {
    return (
        <>
            {((showSuggestions && suggestions.length > 0) || !error) && (
                <ul className='mb-4 bg-white aboslute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2'>
                    {error && suggestions.length === 0 && (
                        <li className='text-red-500 text-sm'>{error}</li>
                    )}
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className='cursor-pointer p-1 rounded hover:bg-gray-200'
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}