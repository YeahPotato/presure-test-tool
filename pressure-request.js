const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const logPath = path.resolve(__dirname, './pressure.log');
const requestEvent = require('./event');

let result = [];

function run([httpAddress, requestAddress, duration], doneCallback) {
    let count = requestAddress.value,
        total = requestAddress.value;

    fs.writeFileSync(logPath, '');
    const h = /https/gi.test(httpAddress.value) ? https : http;
    let now = Date.now();
    while (Date.now() - now <= 1000 && count) {
        sendRequest(h, httpAddress.value, info => {
            result.push(info);
            total--;
            if (!total) {
                fs.writeFile(logPath, `${JSON.stringify(result)}`, err => {
                    if (err) console.log(err);
                });
                const useTime = Date.now() - now;
                doneCallback && doneCallback(result, useTime);
            }
        });
        count--;
    }
}
const uas = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2)'];

function sendRequest(h, url, cb) {
    let info = {
        error: false,
        status: 500
    };
    let timeStart = Date.now();
    let req = h.get(
        url,
        {
            headers: {
                'User-Agent': uas[0]
            }
        },
        res => {
            res.setEncoding('utf8');
            info.status = res.statusCode;
            info.message = res.statusMessage;
            if (info.status !== 200) {
                info.error = true;
                statisticAndEmit(info, timeStart);
                cb && cb(info);
            } else {
                let raw = '';
                res.on('data', data => {
                    raw += data;
                });
                res.on('end', () => {
                    statisticAndEmit(info, timeStart);
                    cb && cb(info);
                });
            }
        }
    );

    req.on('error', err => {
        info.error = true;
        statisticAndEmit(info, timeStart);
        cb && cb(info);
    });
}

function statisticAndEmit(info, timeStart) {
    info.time = Date.now() - timeStart;
    requestEvent.emit('request-once-finish');
}

module.exports = run;
