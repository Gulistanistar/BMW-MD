const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0I2TlNBWWMwMTFiTnZpU3FVeTZXYlIvRjN4TmZreUZmQXIra0xlQ0hVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTIzV0hjeS8weVFlQVZ1dEtPZlJzdFNKZU16WlMwT29Pd3RtOTFreDdSTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSmtPUkRMV2VaWkM0MzlDZ1QxTHQ5TXJHblgzQU5DVktybmFPcTNDeVhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrdWVYREhwTGVRWHNHQVluZ1V1NlcvMnFPNEhYZnVxV3NUcnhrS1UzR2p3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVIMGttZTRtSk5hOWd4aklSOEtFYnZkUWRpb2h4SG9VaURkN0tjQXk1RXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNnTStqeVZXS1FCUzVzMjdDWDBFWjVnck1JdlVFSWJpMGV3UENGVEZKRG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0pCbXJkL3BLVy9CYnVMSzFEOWpxZTJNUUJ1c0pjVERDN0lPTkRVWWJFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFRQNGlSMEhsWnU5aXNJaEJ4bkRXU1RpYUQxcmZxN3FMcktNaWlseUkzcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkwyaVNoNG1vMTMwYkhjNkNPL0xZbFcxZEVrQ25zZXU3Z2lBeDRBSTZpYjJrSlp3YStTWG9YejJBLzl3M0d2MmRNUENPa0JxL1FCeFo0UEptbnR5ZkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzUsImFkdlNlY3JldEtleSI6Inh3cS9DYkRWdWFWRm0rUTNEaVFzbGtuR0I2eVJFSDdrVms0WEszWG01TFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTIxOTQ4OTcxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkRDRDg1Q0JFN0NBRjZEQ0U4REI0NEY5NDFEMjg1NzEyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjM5NjkzNDR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImhxdGRPcHJLUk1XTjNOWkhWNWxvLXciLCJwaG9uZUlkIjoiMDczZjA2NzYtZmYzMS00MjRhLWI5ZjctN2I3ZDU3Nzk2ODVlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFwajZnVGxDeE9Db012MlpCNURLRHRDb0QvUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuNGh3UUZndysycHJzVDZMSTBhODlNaVNRNDQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNlpSSDhBSzUiLCJtZSI6eyJpZCI6IjkyMzEyMTk0ODk3MToxOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIhPSdcIlwiXCJcIlwiVW5rbm93biBwZXJzb25cIlwiXCJcIlwiXCInPSEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01mWTdPd0NFTERlaHJZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InlmS21tVVEwYkJWdFc4MVdnRjRSYmZwTzJpQ1llYTZNOWtTVUFFUGx3bnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im14aVZFSE9QbVhnb2lWVS9OZDdickFsV3RQMmNveFY1NTRuU3BWMDBvbWxjYVJSZW1aQzd0dHR5ZmhvR1VIbmFaMXJqWE9OMVdmak1mSVRzRUNGWUFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ1NzgzNDBQRERnODdDb2lyL2NFTWtHRTdZZDcyRmdESFh1ZWF1L3AwajhvZTZPcVRYcS9oZURIZ2RQT3cxSE9pcG9ZNmpPTCtwazZuNnBKZUIyd2ZEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzEyMTk0ODk3MToxOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjbnlwcGxFTkd3VmJWdk5Wb0JlRVczNlR0b2dtSG11alBaRWxBQkQ1Y0o3In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzOTY5MzQxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUE4RiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "«PRINCESS M»",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " «PRINCESS M»",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
