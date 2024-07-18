// const moment = require('moment');
// require('moment-timezone');
const moment = require('moment-timezone');

// Assume you have a US local time zone and a date/time string
const usTimeZone = 'America/New_York'; // Example: New York time zone
const usLocalTime = '2024-07-14T15:00:00'; // Example: 3 PM on July 14, 2024

// Parse the US local time with the specified time zone
const usTime = moment.tz(usLocalTime, usTimeZone);

// Convert the US local time to IST
const istTime = usTime.clone().tz('Asia/Kolkata');

// Format the IST time as needed
const formattedISTTime = istTime.format('YYYY-MM-DD HH:mm:ss');

console.log(`US Local Time (${usTimeZone}): ${usLocalTime}`);
console.log(`IST Time: ${formattedISTTime}`);
