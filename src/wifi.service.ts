import { Injectable } from '@nestjs/common';
import {WiFiNetwork, connect, disconnect, getCurrentConnections, init,scan} from "node-wifi";

@Injectable()
export class WifiService {

    currentWifiNetwork: WiFiNetwork;

    constructor() {    }

    initializeService(): void{
        init({ iface: null});
    }

    async scanForAvailableNetworks():Promise<WiFiNetwork[]> {
        
        return new Promise((resolve,reject)=>{
            console.log('-----wifi scan started-----');
            scan((error,networks)=>{
                if (error) {
                    reject(error);
                  } else {
                    resolve(networks);
                }
                console.log('-----wifi scan completed-----');
            });

        });
    }

    async connect(ssid: string,password: string): Promise<boolean> {
        return new Promise((resolve, reject)=>{
            connect({ ssid, password}, async () => {

                try {
                    const currentConnections = await this.getCurrentConnection();
                    if(currentConnections){
                        resolve(true);
                    }
                } catch (error) {

                    reject(error);
                }
              })
        });         
    }

    async disconnect(): Promise<string> {
        return new Promise((resolve,reject)=>{
            disconnect(error => {
                if (error) {
                  reject(error);
                } else {
                  resolve('Disconnected');
                }
              })
        });
    }

    async getCurrentConnection(): Promise<WiFiNetwork[]> {
        return new Promise((resolve,reject)=>{
            getCurrentConnections((error, currentConnections) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(currentConnections);
                }
              })
        })
    }
}
