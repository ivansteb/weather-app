import React from "react";

const WeatherSkeleton = () => {
  return (
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-8 w-full pb-10 pt-4 text-gray-300">
      {/* Today data skeleton */}
      <section className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-1 text-2xl items-end">
            <div className="h-7 w-24 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-gray-700 rounded animate-pulse ml-2"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-10 px-6 items-center bg-gray-800/50 rounded-xl p-4">
            {/* Temperature skeleton */}
            <div className="flex flex-col px-4 space-y-2">
              <div className="h-12 w-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-40 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Time and Weather icon skeleton */}
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex flex-col justify-between items-center gap-2">
                  <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-4 w-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Description of weather and icon skeleton */}
          <div className="bg-gray-800/50 rounded-xl p-4 w-full md:w-fit flex flex-col items-center">
            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-16 w-16 bg-gray-700 rounded-full animate-pulse"></div>
          </div>
          
          {/* Weather Details skeleton */}
          <div className="bg-yellow-800/50 rounded-xl p-4 flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse mb-1"></div>
                <div className="h-5 w-12 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 7 days forecast data skeleton */}
      <section className="flex w-full flex-col gap-4">
        <div className="h-7 w-40 bg-gray-700 rounded animate-pulse"></div>
        {[...Array(7)].map((_, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-700 rounded-full animate-pulse"></div>
              <div>
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-12 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="h-3 w-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default WeatherSkeleton;