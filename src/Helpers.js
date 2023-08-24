import moment from "moment";

const Helpers = {
    api_url: 'https://zerobacklog.com/earthling/api/',
    traveller_api: 'https://zerobacklog.com/earthling/api/travellerapi/',
    photo_url: 'https://zerobacklog.com/earthling/api/photo/',
    image_url: 'https://zerobacklog.com/earthling/images/',
    avatars_url: 'https://zerobacklog.com/earthling/avatar/',
    assets_url: 'https://zerobacklog.com/earthling/assets/'
}

export default Helpers;

export const AppConfig = {
    // CLIENTID: 'AYiPDPSl_Cr52ra4wA3z3nvw9WWuwwBsy0hxqQ-LioMIDtMRcha_Lg7BRBV04_nGMF5tpWahQMhOt7UO', // Admin Business Accoount Client ID || SANDBOX
    // SECRET: 'EB41rhr3kdVzFObiRP3IoPG6gaAHt3FAPJCPP2x6IW0_eSlqnh5iqnMlNR_jRqB0hjK1nTlhMdRmwA4U', // Admin Business Accoount Client ID || SANDBOX
    CLIENTID: 'ATLlo4sMmL2iENdfiUL6D3_hGartYeXPyyEMHYLIfYUpNhrhaQoRMkF4iJmcCbANMmsNzDiHyLB5K3XR', // Admin Business Accoount Client ID || LIVE CLIENT
    SECRET: 'EF6Wm-bfd38REtNl0iMMAbOMMGgSfXocNTujM7PopW5IohftVWcI_mECbYsp2j-LAe28J25J1aBrkMbA', // Admin Business Accoount Client ID || LIVE CLIENT
    GOOGLEAPI: 'AAAADJw6epo:APA91bHDH1yeMPF1THda6wTYrE46O_LYXyWVkldsTDPCDEY0qysdPsLhX5VYKp_wUgCn0nAiAZQmrHYLn3ObCs0s4-WYkgolnXU9TypuMRQ7kTVntOHL3hCjnOy_3rDqJwRFYtuBmHcG'
}

export const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getDateDifference = (start_date, end_date) => {
    const date1 = new Date(start_date);
    const date2 = new Date(end_date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

export const parseSmallDate = (thatDate) => {
    const stillUtc = moment.utc(thatDate).toDate();
    const newDate = moment(stillUtc).format('MMM DD');

    return newDate;
}


export const parseDate = (thatDate) => {
    const stillUtc = moment.utc(thatDate).toDate();
    const newDate = moment(stillUtc).format('MMMM DD, YYYY');

    return newDate;
}

export const parseDateTime = (thatDate) => {
    const date = new Date(thatDate);

    let hours = date.getHours();
    let timeF = 'AM';

    if (hours >= 12) {
        timeF = 'PM';
        hours = hours - 12;
    }

    const time = hours + ':' + date.getMinutes() + timeF;

    const year = date.getFullYear() + '';

    const month = date.getMonth() + 1;

    return time + ' | ' + month + '-' + date.getDate() + '-' + year.charAt(2) + year.charAt(3);
}

export const makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}