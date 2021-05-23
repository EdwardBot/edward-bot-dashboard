
export function formatDate(date: Date): string {
    return `${date.getFullYear()}. ${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}. ${date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}. ${date.getHours() < 10 ? `0${date.getHours()}`: date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
}