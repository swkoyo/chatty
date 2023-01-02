/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';

export const formatDate = (date?: Date) => {
    return dayjs(date || new Date()).format('MMM DD, YYYY, hh:mm:ss A');
};
