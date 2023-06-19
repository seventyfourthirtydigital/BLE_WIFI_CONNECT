import bleno from 'bleno';
import { EventEmitter } from 'events';
import { getServiceByType } from './ble-config';

export const BLEEvent = new EventEmitter();

export class WifiNetworkCharacterisitic extends bleno.Characteristic {
    constructor() {
      super({
        uuid: getServiceByType('WifiNetworkCharacterisitic').uuid,
        properties: ['write'],
        value: null,
      });
    }
  
    onWriteRequest(data: Buffer,_offset: number,_withoutResponse: boolean,callback: (result: number) => void) {
      const network = data.toString();
      BLEEvent.emit('connect', network);
      callback(this.RESULT_SUCCESS);
    }
}