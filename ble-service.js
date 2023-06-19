const bleno = require('bleno');

module.exports = class BluetoothApplication {


    constructor(){
        this.blenoInstance  = bleno;
        this.primaryService = null;
        this.characteristics = [];
    }

    async init(){

        this.primaryService = this.blenoInstance.PrimaryService;

        console.log(`Bluetooth Low Energy connector initiated`);

        this.blenoInstance.on('advertisingStart', function(error) {
            console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
          
            if (!error) {
              /* this.blenoInstance.setServices([
                new BlenoPrimaryService({
                  uuid: 'ec00',
                  characteristics: []
                })
              ]); */
            }
        });

        this.blenoInstance.on('stateChange', function(state) {

            console.log('on -> stateChange: ' + state);
          
            if (state === 'poweredOn') {
              this.blenoInstance.startAdvertising('echo', ['ec00']);
            } else {
              this.blenoInstance.stopAdvertising();
            }
          });
    }
}




