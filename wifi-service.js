module.exports = class WifiConnector {

    constructor() {
        this.wifi = require('node-wifi');
    }

    init() {
        this.wifi.init({
            iface: null 
          });
    }

    async scan() {
        return new Promise((resolve,reject)=>{
            this.wifi.scan((error, networks) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(networks);
                }
            });
        });         
    }

    async connect(ssid,password){
        return new Promise((resolve, reject)=>{
            this.wifi.connect({ ssid, password}, (error,resp) => {
                if(resp!=='')
                {
                  reject(new Error(`cannot connect to ${ssid} network`));
                } else {
                   resolve(true);
                }
              })
        });         
    }

    async disconnect() {
        return new Promise((resolve,reject)=>{
            this.wifi.disconnect(error => {
                if (error) {
                  reject(error);
                } else {
                  resolve('Disconnected');
                }
              })
        });
    }

    async getCurrentConnection() {
        return new Promise((resolve,reject)=>{
            this.wifi.getCurrentConnections((error, currentConnections) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(currentConnections);
                }
              })
        })

    }
}