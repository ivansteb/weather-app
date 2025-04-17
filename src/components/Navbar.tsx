import React from 'react'
import { MdMyLocation, MdWbSunny } from 'react-icons/md'
import { SlLocationPin } from 'react-icons/sl'
import SearchBox from './SearchBox'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
            <div className='flex items-center justify-center gap-2'>
                <h2 className='text-gray-500 text-3xl'>Weather</h2>
                <MdWbSunny className='text-3xl mt-1 text-yellow-400' />
            </div>
            <div className='flex gap-4 items-center'>
                <MdMyLocation className='text-2xl text-gray-500 hover:opacity-80 cursor-pointer' />
                <SlLocationPin className='text-3xl text-gray-500 hover:opacity-80 cursor-pointer' />
                <p className='text-slate-900/80 text-sm'>Santo Tomé</p>
                <div>
                    <SearchBox />
                </div>
            </div>
        </div>
    </nav>
  )
}