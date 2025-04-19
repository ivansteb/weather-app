export function getDayOrNightIcon(
    iconname: string,
    dateTimeString: string,
): string {
    const hours = new Date(dateTimeString).getHours();
    const isDayTime = hours >= 6 && hours < 18; // 6 AM to 6 PM

    const iconSuffix = isDayTime ? iconname.replace(/.$/, 'd') : iconname.replace(/.$/, 'n');
    return iconSuffix;
}