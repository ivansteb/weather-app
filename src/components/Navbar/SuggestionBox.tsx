import React from 'react'

type Props = {}

export default function SuggestionBox({
    suggestions,
    showSuggestions,
    handleSuggestionClick,
    error
}: {
    suggestions: string[];
    showSuggestions: boolean;
    handleSuggestionClick: (suggestion: string) => void;
    error: string;
}) {
    return (
        <>
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2'>
                    {error && suggestions.length == 0 && (
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