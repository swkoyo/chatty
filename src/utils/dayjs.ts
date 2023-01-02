/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';

export const formatDate = (date: Date) => {
    return dayjs(date).format('MMM DD, YYYY');
};
