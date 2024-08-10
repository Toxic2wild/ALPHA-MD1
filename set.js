const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0I0cUJKSGdKcTdjVVlnWXhxbnFyN05GWnJKbm0rVmZRQmV4YmxqWHQwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFIzcTU5SFBZdzNIZ3JzMFNhdXJuWlhjNHYvVVBUemtZdE1YRDl0OFpUVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDTEx6aFVNSXpYWENoQVJlcmZZS3RMUEFmM3ZsZzg0MUdDN20xYThVV1dFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFYm51SSt5WDVncDQ0RERMSGdYSG91Tm9DMG43U0tGTHI4aWNOblJ0a0QwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdObWgyN1QwN21JWXNoeXRsdVdVcUNxTDU5MzR3SHlCTnR3MG0rTDJpV2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBibldIckVIYStCV0V5emt3QXBXQ3VQRU9VZ01GeE5BTU5nZWpGd1d3Z1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZGVXgxam1yZTlVNmVaRzlJeTJPN1lLM1FHNEFRcFVTalcvTWFqMmoyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN2NtVWE0QjhnQ21PNGZCczQxMmU0SG0yV3JuL3BRQ0lRRlRyRUhHM0NIOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhoQzQ0YkwxZnVxSGxsZG83TEJ0MzZ4bU5ENkVrTXhTQUlXYVlTaXlpU2E5R2pOd2w4K1JTaFRDb2RFZVBQUC9QZWlZOUZDK1IwcXd4L0ZxOGJzZml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU2LCJhZHZTZWNyZXRLZXkiOiJrNm1Zc01PYWtlbzJMZVBKQkF0ZmtwbXAzbnR0VkltemFhZGJ2cUg0N2RBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJDSlJmNmVrclFPcTJncFNYNFpBYU5RIiwicGhvbmVJZCI6IjM0MGMyMGI3LTA4M2UtNDA4Yi1hZTU4LTFmMTEyMjg1MDhlZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpN0pqaVhwQ0NiVDVIbVV4Vk1Dc08zZTdieW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTURRcllCdTdzNW9NRVJqWjJKMWxHbkRkanZJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVLNjJGVlJXIiwibWUiOnsiaWQiOiIyMzQ5MDM5MDMxMzkyOjcxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNUFk0cWdDRUlPNTNyVUdHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWTTd5SkpheEFmdDNxYXJ1dW1jWEFDc1JydDAzeWFCR0UyTmlxVEJZU0h3PSIsImFjY291bnRTaWduYXR1cmUiOiIyaHlxaHJxRTdJYUF3N0RhTVIzYnBBZVJhbEpXWEozZmxFaWxiNDhRcENvYmd3ZCtTZHltd2hWUEgrbjhvbnFqaERPZmVtZDdsNEdpbklwSXBDQWZEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoid3FIaGJicFh6MXdYaURiYmwxeDlUVHFYNEhiN05RYktVc1JLT0wvcFpWVnFKMGZxcnJaOXpIL3cxdmh6aGFNTWMvTlRwTmNjRnZQSGlnbjVKMmk4Z2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDM5MDMxMzkyOjcxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZUTzhpU1dzUUg3ZDZtcTdycG5Gd0FyRWE3ZE44bWdSaE5qWXFrd1dFaDgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzMDkyMDF9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "BEASTBOT",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording,
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
