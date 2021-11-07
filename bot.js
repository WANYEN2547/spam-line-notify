const Monitor = require('monitor');
const request = require('request')
const LOW_MEMORY_THRESHOLD = 1000;
const token = 'S1VLBgknmr6GDPDbfK5g7sFhooIV8eyoCdXsIsBUlNC';

var options = {
        probeClass: 'Process',
        initParams: {
            pollInterval: 30
        }
    }
    //var number_one = Math.floor(Math.random() * 34502589329);
var processMonitor = new Monitor(options);

processMonitor.on('change', () => {
    var freemem = processMonitor.get('freemem');
    var msg = "มีคนรักหวานเย็นทั้งหมด " + freemem;
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        'auth': {
            'bearer': token
        },
        form: {
            message: msg,
        }
    }, (err, httpResponse, body) => {
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(httpResponse));
        console.log(JSON.stringify(body));
    })
});

processMonitor.connect((error) => {
    if (error) {
        console.error('error : ', error);
        process.exit(1);
    }
});