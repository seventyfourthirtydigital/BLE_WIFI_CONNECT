const bleServices =  [
        {
            name: 'Wifi Connectivity Characterisitic',
            type: 'WifiNetworkCharacteristic',
            uuid: '2c46eb8e-351c-4fdc-8abc-438723789905'
        },
        {
            name: 'Wifi Connectivity Service',
            type: 'WifiConnectivityService',
            uuid: 'a5e2fba9-e0d7-4dee-aac4-7c6af6a4d371'
        }
    ];


export const getServiceByType = (typename: string) =>{
    return bleServices.find((resp)=>{ return resp.type == typename;})
}