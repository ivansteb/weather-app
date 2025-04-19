import { cn } from '@/utils/cn';
import React from 'react'
import { IoSearch } from 'react-icons/io5'

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form 
        onSubmit={props.onSubmit}
        className={cn('flex relative items-center justify-center h-10', props.className)}
    >
        <input
            onChange={props.onChange}
            value={props.value}
            type='text' 
            placeholder='Seach location...' 
            className='px-4 py-2 w-[200px] text-sm border border-gray-300 rounded-l-xl focus:outline-none focus:border-blue-500 h-full'
        />
        <button className='px-4 py-[10px] bg-blue-500 text-white rounded-r-xl focus:outline-none hover:bg-blue-500 whitespace-nowrap h-full'>
            <IoSearch />
        </button>
    </form>
  )
}