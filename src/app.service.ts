import { Injectable } from '@nestjs/common';
import { WifiService } from './wifi.service';
import { WiFiNetwork } from 'node-wifi';
import bleno from 'bleno';
import { getServiceByType } from './ble/ble-config';
import { WifiNetworkCharacterisitic } from './ble/WifiNetworkCharacteristic';

@Injectable()
export class AppService {

  bleService = getServiceByType('WifiConnectivityService');
  currentWifiNetwork: WiFiNetwork;
  availableNetworks: WiFiNetwork[];

  constructor(private wifiService: WifiService) {
  }

  async run()  {
        try {

          this.wifiService.initializeService();

          this.availableNetworks = await this.wifiService.scanForAvailableNetworks();

          console.log(this.availableNetworks);

          //avail.map((item) => item.ssid )
          //.filter((value, index, self) => self.indexOf(value) === index);

          await this.startBluetoothService();


        } catch (error) {
          console.log(error);
        }
  }


  async startBluetoothService(){

    bleno.on('stateChange', (state) => {
      if (state === 'poweredOn') {
        bleno.startAdvertising(this.bleService.name, [this.bleService.uuid]);
      } else {
        bleno.stopAdvertising();
      }
    });

    bleno.on('advertisingStart', (error) => {
      if (!error) {
        bleno.setServices([
          new bleno.PrimaryService({
            uuid: this.bleService.uuid,
            characteristics: [new WifiNetworkCharacterisitic()],
          }),
        ]);
      }
    });
  }
}
