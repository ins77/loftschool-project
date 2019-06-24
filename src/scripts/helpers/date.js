import moment from 'moment';

const getFormattedDate = date => moment(date).format('YYYY.MM.DD');
const getFormattedTime = date => moment(date).format('hh:mm:ss');
const getFullDate = date => `${getFormattedDate(date)} ${getFormattedTime(date)}`;

export {
    getFullDate
};