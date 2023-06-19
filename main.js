const WifiService = require('./wifi-service');
const BluetoothService = require('./ble-service');

let availableNetworks = [];
let connectionResponseStatus = 'could not connect';

class Application {

    constructor(){
        this.wifiService = new WifiService();
        this.bleService = new BluetoothService();
    }

    async run() { 
        this.wifiService.init();
        this.bleService.init();
        //await this.scanForWifiNetworks();
/* 
        try {
            let connectResponse = await        
            this.wifiService.connect('afrobot','@deboyin_7430');
            connectionResponseStatus = connectResponse==true ? 'connected' : 'could not connect';

        } catch (error) {
            connectionResponseStatus ='could not connect';

        }
        console.log(connectionResponseStatus); */




    }

    async scanForWifiNetworks(){
        console.log('wireless scan started');
        const networks = await this.wifiService.scan();
        availableNetworks = networks.map((item) => item.ssid)
                            .filter((value, index, self) => self.indexOf(value) === index);
       console.log('--discovered networks--');
       availableNetworks.forEach((element)=>{
            console.log(element);
       } )
        console.log(`----------------`);
        console.log('wireless scan completed');
    }
}

const app = new Application();

app.run();

