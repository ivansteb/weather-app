'use client';
import Navbar from "@/components/Navbar/index";
import { Raleway } from "next/font/google";
import WeatherSkeleton from "@/components/Skeleton/WeatherSkeleton";
import { useWeatherData } from "@/hooks/useWeatherData";
import TodayWeather from "@/components/TodayWeather";
import SevenDayForecast from "@/components/SevenDayForecast";
import Footer from "@/components/Footer";

const ralewayFont = Raleway({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-raleway',
});

export default function Home() {

  const { isPending, loadingCity, data, firstData, firstDataForEachDate } = useWeatherData();

  if (isPending) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    )
  }

  return (
    <div className={`${ralewayFont.variable} flex flex-col gap-4 bg-gray-700 min-h-screen`}>
      <div className='font-main'>
        <Navbar location={data?.city.name} />

        {loadingCity ? <WeatherSkeleton /> : (
          <main className="px-3 max-w-7xl mx-auto flex flex-col gap-8 w-full pb-10 pt-4 text-gray-300">
            <TodayWeather
              firstData={firstData}
              data={data}
            />
            <SevenDayForecast
              firstDataForEachDate={firstDataForEachDate}
              data={data}
            />
          </main>
        )}

        <Footer />
      </div>
    </div>
  );
}
