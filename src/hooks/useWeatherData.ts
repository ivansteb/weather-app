import { loadingCityAtom, placeAtom } from '@/app/atom';
import { WeatherData } from '@/types/Weather';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect } from 'react'

export function useWeatherData() {
    const [place] = useAtom(placeAtom);
    const [loadingCity] = useAtom(loadingCityAtom);
  
    const { isPending, error, data, refetch } = useQuery<WeatherData>({
        queryKey: ['repoData'],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
            );
            return data;
        },
        enabled: !!place, // Solo ejecutar la consulta si hay un lugar definido
    })
  
    // Refetch data cuando cambia la ciudad
    useEffect(() => {
      refetch();
    }, [place, refetch]);
  
    const firstData = data?.list[0];
    
    const firstDataForEachDate = (() => {
      if (!data?.list) return [];
    
      const dateMap = new Map<string, any>();
    
      data.list.forEach((item) => {
        const entryDate = new Date(item.dt * 1000).toISOString().split('T')[0];
        const entryTime = new Date(item.dt * 1000).getHours();
    
        // Solo considerar entradas después de las 6:00 AM
        if (entryTime >= 6) {
          // Si no hay una entrada para esta fecha o la actual es más temprana, actualizar
          if (!dateMap.has(entryDate)) {
            dateMap.set(entryDate, item);
          }
        }
      });
    
      return Array.from(dateMap.values());
    })();
  
    return { isPending, error, data, firstData, firstDataForEachDate, loadingCity };
}