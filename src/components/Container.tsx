import { cn } from '@/utils/cn'
import React from 'react'

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div 
        {...props} 
        className={cn("w-full bg-slate-600 rounded-xl flex py-4 my-4 shadow-lg", props.className)}
    />
  )
}