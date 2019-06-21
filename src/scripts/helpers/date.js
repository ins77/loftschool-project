const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth= month < 10 ? `0${month}` : `${month}`;
    const formattedYear = year < 10 ? `0${year}` : `${year}`;

    return `${formattedYear}.${formattedMonth}.${formattedDay}`;
};

const getFormattedTime = (date) => {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const getFullDate = date => `${getFormattedDate(date)} ${getFormattedTime(date)}`;

export {
    getFullDate
};