const http = require("http");
const url = require("url");
const { Corridor, Floor } = require('./model');
const { resolveQuery, generateReport } = require('./helpers');
const readline = require('readline');
global.myHotel = { floors: [] }; // in memory // redis will be used here
function initProgram() {
    console.log('Initialize Program with initial data:');
    let rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('Number of Floors: ', function (floors) {
        rl.question('Main Corridors per floor: ', function (corridors) {
            rl.question('Sub Corridors per floor: ', function (subCorridors) {
                for (let i = 0; i < floors; i++) {
                    // floors
                    global.myHotel["floors"].push(new Floor());
                    // main corridors defaults
                    global.myHotel["floors"][i].corridors = [];
                    for (let x = 0; x < corridors; x++) {
                        global.myHotel["floors"][i].corridors.push(new Corridor('main', {
                            AC: { on: true },
                            light: { on: true }
                        }));
                    }
                    // sub corridors defaults
                    global.myHotel["floors"][i].subCorridors = [];
                    for (let x = 0; x < subCorridors; x++) {
                        global.myHotel["floors"][i].subCorridors.push(new Corridor('sub', {
                            AC: { on: true },
                            light: { on: false }
                        }));
                    }
                    global.myHotel["floors"][i].allowedPowerConsumption = (15 * global.myHotel["floors"][i].corridors.length + 10 * global.myHotel["floors"][i].subCorridors.length);
                    global.myHotel["floors"][i].checkPowerConsumption();
                }
                generateReport();
                rl.close();
            });
        });
    });
}
// this work can be handled by expressjs
const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url);
    // accept external input from sensors
    if (urlObj.pathname === '/receiver') {
        const operation = resolveQuery(urlObj.query.split('&'));
        let floor = global.myHotel['floors'][operation['floor'] - 1];
        let subcorridor = floor && floor['subCorridors'][operation['sub_corridor'] - 1];
        if (floor && subcorridor) {
            console.log("External input got from sensors.");
            subcorridor.equipments['AC'].on = false; // this is modifiable 
            subcorridor.equipments['light'].on = true; // based on requirement
            subcorridor.lastMovement = new Date().getTime(); //update mvement
            floor.checkPowerConsumption();
            generateReport();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end("{ success: true }");
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(global.myHotel));
});

server.listen(3000, () => {
    console.log(`\nServer listening on port ${server.address().port} for sensor data.\n`);
    initProgram();
});
