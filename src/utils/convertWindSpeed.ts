export function convertWindSpeed(speedInMps: number): string {
    const speedInKmph = speedInMps * 3.6; // Convert m/s to km/h
    return `${speedInKmph.toFixed(0)} km/h`;
}