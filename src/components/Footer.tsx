import React from 'react'

type Props = {}

export default function Footer({}: Props) {

    const currentYear = new Date().getFullYear();

    return (
        <footer className='flex flex-col gap-2 bg-gray-800 text-center text-gray-300/60 text-sm p-10'>
            <p>© {currentYear} Weather App. Algunos derechos reservados.</p>
            <a href="https://github.com/ivansteb/weather-app " target="_blank" rel="noopener noreferrer">
                <p className='hover:text-gray-300'>Made with ❤️ by Iván</p>
            </a>
        </footer>
    )
}